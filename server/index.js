const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose= require('mongoose')
const USER = require('./models/User')

app.use(cors({
  credentials: true,  //allowing cookies to be sent
  origin: 'https://whole-slide-image-viewer-client.vercel.app',    //ORIGIN tells what app can communicate with API
  // origin: 'http://localhost:5173',    //ORIGIN tells what app can communicate with API
}))
app.use(express.json())
app.use(cookieParser())

mongoose
  .connect("mongodb+srv://aditisharma3711as:7JXDCn5mhckcNJmz@cluster0.uwg59.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/register', async (req,res)=>{
    const {name, email, password} = req.body;

    // register the user
    const createdUser = await USER.create({
        name: name,
        email: email,
        password: password
    })

    res.status(201).json(createdUser);
})

app.listen(8000 , ()=> console.log("server started on 8000"))
