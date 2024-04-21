import {useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [bloodGroup, setBloodGroup] = useState("")

    const navigate=useNavigate()

    const handelRegister=async(e)=>{
        e.preventDefault()
       try {
        const payload={name,email,password,phone,address,bloodGroup}
       
        const res=await axios.post('http://localhost:8080/api/v1/auth/register' ,
        payload)
        
        if(res.data.success){
          alert(res.data.message)
          navigate('/login')
         }
         else{
         alert(res.data.message)

       }
       } catch (error) {
        console.log(error)
        alert("Something Went Wrong")
       }
    }

  return (
    <>
     <div className="loginPage">

<h1>Register</h1>
<div className="form-container">
<p className="title">Fill the following details</p>
<form className="form">
<input type="text" className='input' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
<input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
<input type="text" className='input' placeholder='Phone no.' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
<input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
<input type="text" className='input' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
    <select className='bloodGroup' value={bloodGroup} onChange={(e)=>setBloodGroup(e.target.value)}>
        <option value="1" >Choose Your Blood Group:</option>
        <option value="AP">A+</option>
        <option value="AN">A-</option>
        <option value="BP">B+</option>
        <option value="BN">B-</option>
        <option value="OP">O+</option>
        <option value="ON">O-</option>
        <option value="ABP">AB+</option>
        <option value="ABN">AB-</option>
        
    </select>
<button className="form-btn" onClick={handelRegister}>Register</button>
</form>
<p className="sign-up-label">
Don't have an account? <Link className="sign-up-link" to='/login'>Login</Link>
</p>

</div>
</div>
    </>
  )
}

export default Register
