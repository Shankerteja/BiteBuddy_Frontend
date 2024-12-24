import React, { useState } from 'react'
import { API_URL } from '../Apis/Apis';
import Cookies from 'js-cookie'
const Login = (props) => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin=async (event)=>{
    event.preventDefault();
    const {handleWelcome}=props
    try {
      const options={
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
      }

      const response=await fetch(`${API_URL}/vendor/login`,options)
      const data=await response.json()
      if(response.ok){
  
        console.log(data);
        setEmail("")
        setPassword("")
        localStorage.setItem("token",data.token);
        alert('Vendor Login SuccessFully')
      }
      const vendorId=data.vendorId;
      const username=data.vendorName
     
      Cookies.set('Username', username, {expires: 1});
 
      const responseVendor=await fetch(`${API_URL}/vendor/vendor/${vendorId}`);
      if(response.ok){
        const firmData=await responseVendor.json()
        console.log(firmData)
        if(firmData.vendorDetails.firm.length>0){
          const firmId=firmData.vendorDetails.firm[0]._id
          const firmName=firmData.vendor.firm[0].firmName
          localStorage.setItem("firmId",firmId)
          localStorage.setItem("firmName",firmName)
        }
        window.location.reload()
   
  
      }
    

      
    } catch (error) {
      console.error(error)
      alert("login failed")

      
    }
  }

  return (
    <div className='login-form-container'>

      <h1 className='heading'>
        WelCome Back!
      </h1>
      <form className='login-form' onSubmit={handleLogin}>
       <div>
        <label>Email</label>
        <input type='text' placeholder='email' value={email} onChange={(event)=>setEmail(event.target.value)}/>
       </div>
       <div>
        <label>
            Password
        </label>
        <input type='password' placeholder='Password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
       </div>
       <button type='submit' className='login-submit'>
        Submit
       </button>
      </form>
    </div>
  )
}

export default Login
