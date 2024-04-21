import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../css/DonateBlood.css'
const DonateBlood = () => {
  const navigate=useNavigate()
  const [bloodData, setBloodData] = useState([])
  const [address, setAddress] = useState()
  const [bloodGroup, setBloodGroup] = useState()
  const [createdBy, setCreatedBy] = useState()
  
  const getBloodNeeds=async()=>{
    if(bloodGroup && address){
      const {data}= await axios.get(`http://localhost:8080/api/v1/blood/get-blood-needs?bloodGroup=${bloodGroup}&addres=${address}`);
       if(data.bloodNeeds.length==0){
         alert('No Data Found regarding this filter')
         window.location.reload()
       }
      
      setBloodData(data.bloodNeeds.filter(item => item.isAccepted ==false));
      return ;
    }
    if(address){
      const {data}= await axios.get(`http://localhost:8080/api/v1/blood/get-blood-needs?address=${address}`);
      if(data.bloodNeeds.length==0){
        alert('No Data Found regarding this filter')
        window.location.reload()
      }
      setBloodData(data.bloodNeeds.filter(item => item.isAccepted ==false));
      return ;
    }
    if(bloodGroup){
      const {data}= await axios.get(`http://localhost:8080/api/v1/blood/get-blood-needs?bloodGroup=${bloodGroup}`);
      if(data.bloodNeeds.length==0){
        alert('No Data Found regarding this filter')
        window.location.reload()

      }
      setBloodData(data.bloodNeeds.filter(item => item.isAccepted ==false));
      return ;
    }
 
    const {data}= await axios.get('http://localhost:8080/api/v1/blood/get-blood-needs');
    
    setBloodData(data.bloodNeeds.filter(item => item.isConfirmed ==false));
    
   
  }


  
  var user = JSON.parse(localStorage.getItem('token'));
   const id = user.existingUser._id

const handelAccept=async(pId)=>{
       try {
       
      
      const res=await axios.get(`http://localhost:8080/api/v1/blood/get-single-blood/${pId}`)
       if(res.data.bloodNeed.acceptedUser === id){
        return alert("One one donation at a time")
       }
       if(res.data.bloodNeed.createdBy === id){
        return alert("Can't Accept your Own Blood Need")
       }
       if(res.data.bloodNeed.isAccepted === true){
          return(window.location.reload() 
          && alert("Someone has already Accepted the need")
          )
       }
       

        
        const payload={isAccepted:true,acceptedUser:id}
        const { data } = await axios.put(`http://localhost:8080/api/v1/blood/update-accepted/${pId}`,payload);

        if(data.success){
          alert(data.message)
          navigate('/profile')
        }
        else{
          alert(data.message)
        }


       } catch (error) {
        console.log(error)
        alert("Something went wrong")
       }
}
const removeFilter=()=>{
  alert('Filter Removed')
  window.location.reload()
}

  useEffect(()=>{
    getBloodNeeds();

  },[])

  
  return (
    <div>
        <Navbar/>
        <h2>Donate Blood</h2>
        <div className="filter">
        <input type="text" className='input' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
        <select className='bloodGroup' value={bloodGroup} onChange={(e)=>setBloodGroup(e.target.value)}>
        <option value="1" >Choose Blood Group:</option>
        <option value="AP">A+</option>
        <option value="AN">A-</option>
        <option value="BP">B+</option>
        <option value="BN">B-</option>
        <option value="OP">O+</option>
        <option value="ON">O-</option>
        <option value="ABP">AB+</option>
        <option value="ABN">AB-</option>
        
    </select>
        <button className='filterBtn' onClick={getBloodNeeds}>Apply filter</button>
        <button className='filterBtn' onClick={()=>removeFilter()}>Remove filter</button>
        </div>
        <div className="allBlood">
        
        {bloodData.map((p, index) => (
     
         
          <div className={ p.createdBy==id ?"bloodCard green":" bloodCard "} key={index} >
           
           <div className='bGroup' > <div> BloodGroup:</div> <div> {p.bloodGroup}
           </div> </div>
           <div className='bName' > <div>Name:</div> <div>{p.name}</div>  </div>
           <div className='bMobile' > <div> Mobile No.:</div> <div>{p.phone}</div> </div>
           <div className='bHospital' > <div>Hospital:</div> <div>{p.hospital}</div>  </div>
           <div className='bAddress' ><div>Address:</div> <div>{p.address}</div>  </div>
           <button className='acceptBtn' onClick={()=>handelAccept(p._id)}>Accept</button>
           </div>
            
        ))}
        </div>
      
        
    </div>
  )
}

export default DonateBlood
