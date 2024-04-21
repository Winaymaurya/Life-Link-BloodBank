import {useState} from 'react'
import { Link } from 'react-router-dom'
import '../css/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate=useNavigate()
    const handelLogin=async(e)=>{
        e.preventDefault();
        try {
            const payload={email,password}
           const res=await axios.post('http://localhost:8080/api/v1/auth/login' ,
           payload)
           if(res.data.success){
            alert(res.data.message)
            localStorage.setItem("token", JSON.stringify(res.data));
            navigate('/')
           }
           else{
            alert(res.data.message)
           }
        
    

        const payload1={mailTo:email,sendText:"You Login Successful on Life-Link , Get Help and Help others"}
        console.log(payload1)  
       const {data1}= await axios.post(`http://localhost:8080/api/v1/mail/send-mail`,payload1)
         if(data1){
          alert(data1.message)
         }
       

        } catch (error) {
            console.log(error)
            alert("Something Went wrong in Login")
        }


    }
  return (
    <>
    <div className="loginPage">

    <h1>Login</h1>
    <div className="form-container">
  <p className="title">Welcome back,</p>
  <form className="form">

    <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
    <button className="form-btn" onClick={handelLogin}>Log in</button>
  </form>
  <p className="sign-up-label">
    Don't have an account? <Link className="sign-up-link" to='/register'>Register</Link>
  </p>
 
  </div>
  </div>


    </>
  )
}

export default Login
