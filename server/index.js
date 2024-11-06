const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose= require('mongoose')
const USER = require('./models/User')
require('dotenv').config()

app.use(cors({
  credentials: true,  //allowing cookies to be sent
  origin: 'https://whole-slide-image-viewer-client.vercel.app',    //ORIGIN tells what app can communicate with API
  // origin: 'http://localhost:5173',    //ORIGIN tells what app can communicate with API
}))
app.use(express.json())
app.use(cookieParser())

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/register', async (req,res)=>{
  try {
    console.log('MONGODB_URL:', process.env.MONGODB_URL);
    const {name, email, password} = req.body;
    // Register the user
    const createdUser = await USER.create({
        name: name,
        email: email,
        password: password
    })
    res.status(201).json(createdUser);
    
  } catch (error) {
    res.status(500).send('Error occurred');
  }
})
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

app.listen(process.env.PORT , ()=> console.log(`Server started on ${process.env.PORT}`))
