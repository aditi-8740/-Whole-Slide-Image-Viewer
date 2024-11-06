import axios from 'axios'
import { useState } from 'react'

axios.defaults.baseURL = "https://whole-slide-image-viewer-server.vercel.app"
// axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.withCredentials = true; // Ensure credentials are sent if needed

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event) {   //send request to api
      event.preventDefault();           //prevents form from submitting ,Not reloading page.
      await axios.post('/register',{    //data we want to send
          name,
          email,
          password,
      })
      .then((res)=>{
          console.log(res)    //resolved value of await axios post request
          console.log(res.data)
      }
          
      )
  }

  return (
    <div className="text-center grow flex flex-col justify-center h-screen">
        <h2 className="text-2xl ">Register</h2>
        <form className="max-w-lg mx-auto" onSubmit={registerUser}>
            <input type="text" placeholder="fullname"
                value={name}
                onChange={(event)=>{ setName(event.target.value) }} 
            />
            <input type="email" placeholder="youremail@gmail.com"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <input type="password" placeholder="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
            <button className="button-primary">Register</button>
        </form>
    </div>
)
}

export default App
