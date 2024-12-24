import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Register from '../components/forms/Register'
import Login from '../components/forms/Login'
import AddFirm from '../components/forms/AddFirm'
import AddProducts from '../components/forms/AddProducts'
import Welcom from '../components/Welcom'
import AllProducts from '../components/AllProducts'


const LandingPage = () => {

    const [showLogin,setShowLogin]=useState(false)
    const [showRegister,setShowRegister]=useState(false)
    const [showAddProduct,setAddProduct]=useState(false)
    const [showAddFirm,setShowAddFirm]=useState(false)
    const [showWelcome,setShowWelcome]=useState(true)
    const [allProducts,setShowProducts]=useState(false)
    const [showLogout,setShowLogout]=useState(false)
    const [showAddNav,setShowAddNav]=useState(true)

        const handleLogout=()=>{
          if(window.confirm("Are you Sure? Want to Logout?")){
            localStorage.removeItem('token');
            localStorage.removeItem('firmId')
            localStorage.removeItem('firmName')
            Cookies.remove('Username');
            setShowLogout(false)
            setShowAddNav(true)
      
          
          }


        }
        
        const handleLogin=()=>{
            setShowRegister(false)
            setShowLogin(true)
            setShowAddFirm(false)
            setAddProduct(false)
            setShowWelcome(false)
            setShowProducts(false)

        }
        const handleShowProducts=()=>{
          if(showLogout){
            setShowRegister(false)
            setShowLogin(false)
            setShowAddFirm(false)
            setAddProduct(false)
            setShowWelcome(false)
            setShowProducts(true)
          }else{
            alert("Please Login")
          }
         
       
      

      }
        const handleWelcome=()=>{
            setShowRegister(false)
            setShowLogin(false)
            setShowAddFirm(false)
            setAddProduct(false)
            setShowWelcome(true)

setShowProducts(false)          }
        const handleRegister=()=>{
            setShowRegister(true)
            setShowLogin(false)
            setShowAddFirm(false)
            setAddProduct(false)
            setShowWelcome(false)
            setShowProducts(false)
        }
        const handleAddFirm=()=>{
          if(showLogout){
            setShowRegister(false)
            setShowLogin(false)
            setShowAddFirm(true)
            setAddProduct(false)
            setShowWelcome(false)
            setShowProducts(false)

          }else{
            alert("please Login")
  

          }
          
          
        }
        const handleAddProduct=()=>{
          if(showLogout){
            setShowRegister(false)
            setShowLogin(false)
            setShowAddFirm(false)
            setAddProduct(true)
            setShowWelcome(false)
            setShowProducts(false)

          }else{
            alert("Please Login")
          }
         
        
        }
        useEffect(()=>{
          const jwtToken=localStorage.getItem('token');
          if(jwtToken){
            setShowLogout(true)
          }
        },[])


        useEffect(()=>{
          const firmName=localStorage.getItem('firmName')
 
          if(firmName){
            setShowAddNav(false)
          }
        },[])

  return (
    <section>
       <Navbar handleLogin={handleLogin} handleRegister={handleRegister} showLogout={showLogout} handleLogout={handleLogout} />
    <div className='body-container'>
        <Sidebar handleAddFirm={handleAddFirm} handleAddProduct={handleAddProduct} handleShowProducts={handleShowProducts} showAddNav={showAddNav}/>
        <div className='cards-container'>
   
  {showLogin && <Login handleWelcome={handleWelcome}/>}
    {showRegister && <Register handleLogin={handleLogin}/>}
  {showAddFirm &&  showLogout &&  <AddFirm/>}
  {showAddProduct && showLogout && <AddProducts/>}
{showWelcome && showLogout && <Welcom/>}
{allProducts && showLogout && <AllProducts/>}
        </div>
        
    </div>
    </section>
  )
}

export default LandingPage
