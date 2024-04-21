import {useState} from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import '../css/BloodNeed.css'
import axios from 'axios'
const BloodNeed = () => {
  const navigate=useNavigate()
  const [name, setName] = useState("")
  const [hospital, setHospital] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [bloodGroup, setBloodGroup] = useState("")

  const handelBloodNeed= async(e)=>{
    e.preventDefault();
      try {
        var user = JSON.parse(localStorage.getItem('token'));
        const id=user.existingUser._id
        const payload={name,hospital,phone,address,bloodGroup,isConfirmed:false,createdBy:id ,isAccepted:false}
        console.log(payload)
        const res=await axios.post('http://localhost:8080/api/v1/blood/blood-need' ,
        payload)
        
        if(res.data.success){
          alert(res.data.message)
          navigate('/donate-blood')
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
        <Navbar/>
        <div className="bloodNeedBox">

       
        <div className="image">
          <img src="https://img.freepik.com/free-vector/flat-design-volunteer-donating-blood_23-2148273548.jpg?t=st=1713243477~exp=1713247077~hmac=36d0ab18814afed41104bb42cf9f169ab06eca41f8fb54cbfe30e613a42a6957&w=740" alt="" />
        </div>
        <div className="form-container">
<p className="title">Ask For Blood</p>
<form className="form">
<input type="text" className='input' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
<input type="text" className='input' placeholder='Phone no.' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
<input type="text" className="input" placeholder="Hospital" value={hospital} onChange={(e)=>setHospital(e.target.value)}/>
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
<button className="form-btn" onClick={handelBloodNeed}>Submit</button>
      </form>
    </div>
    </div>
    </>
  )
}

export default BloodNeed
