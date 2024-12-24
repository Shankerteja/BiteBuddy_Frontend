import React from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import LandingPage from './vendorDashBoard/pages/LandingPage'
import NotFound from './vendorDashBoard/components/forms/NotFound'
function App() {
  return (
    <div>

   <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/*' element={<NotFound/>}/>
    
   </Routes>
      
    </div>
  )
}

export default App