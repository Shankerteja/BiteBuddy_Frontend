import React, { useState } from 'react'
import { API_URL } from '../Apis/Apis';

const Register = ({handleLogin}) => {
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
   
    const handleSubmit=async (event)=>{
        event.preventDefault();
        try {
            const options={
                method:'POST',
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({username,email,password})
            }
            const response=await fetch(`${API_URL}/vendor/register`,options)
            if(response.ok){
                setEmail("")
            setPassword("")
            setUsername("")
                alert("Vendor Registerd SucessFully")
                handleLogin()
            }
        } catch (error) {
            console.error(error)
            alert("Register Failed")
        }
    }
    
    
  return (
    <div className='register-container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <h1 className='heading'>Register</h1>
        <div>
            <label htmlFor='username'>
                Username
            </label>
            <input type='text' id="username" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div >
            <label>
                Email
            </label>
            <input type='email' placeholder='Email' value={email} onChange={(event)=>setEmail(event.target.value)}/>
        </div>
        <div>
            <label >
                Password
            </label>
            <input type='password' placeholder='Password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
        </div>
        <button type='submit' className='submit-button'>
            Submit
        </button>
      </form>
    </div>
  )
}

export default Register
