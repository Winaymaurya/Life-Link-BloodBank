
import './App.css'
import HomePage from './pages/HomePage'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedWrapper from './utils/ProtectedRoutes'
import UnprotectedWrapper from './utils/UnprotectedRoutes'
import Profile from './pages/Profile'
import DonateBlood from './pages/DonateBlood'
import BloodNeed from './pages/BloodNeed'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedWrapper><HomePage/></ProtectedWrapper> }/>
        <Route path='/login' element={<UnprotectedWrapper><Login/></UnprotectedWrapper> }/>
        <Route path='/register' element={<UnprotectedWrapper><Register/></UnprotectedWrapper> }/>
        <Route path='/blood-need' element={ <ProtectedWrapper><BloodNeed/></ProtectedWrapper>}/>
        <Route path='/donate-blood' element={ <ProtectedWrapper><DonateBlood/> </ProtectedWrapper>}/>
        <Route path='/profile' element={ <ProtectedWrapper><Profile/></ProtectedWrapper>}/>
    
      </Routes>
    </>
  )
}

export default App
