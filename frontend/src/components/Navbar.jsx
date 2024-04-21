import React  from 'react'
import { NavLink ,Link} from 'react-router-dom'
import '../css/Navbar.css'
import { useState } from 'react'
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
    <nav className='navbar'>
        <Link className="logo " to='/'>Life-Link</Link>
         <div className='menu' onClick={()=>{
            setMenuOpen(!menuOpen)
         }}>
            <span></span>
            <span></span>
            <span></span>
         </div>
        
            <ul className={menuOpen? "open" :" "}>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink to='/blood-need' >Blood Need</NavLink>
            </li>
            <li>
                <NavLink to='/donate-blood'>Donate</NavLink>
            </li>
            <li>
                <NavLink to='/profile'>Profile</NavLink>
            </li>
           
        </ul>
   
        
    </nav>
    </>
  )
}

export default Navbar
