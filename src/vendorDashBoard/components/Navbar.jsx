import React from 'react'

const Navbar = (props) => {
    const {handleLogin,handleRegister,showLogout,handleLogout}=props
    const firmName=localStorage.getItem('firmName')
  return (
    <header>
        <nav>
           <a href='#'>
            BiteBuddy
           </a>
           {
            firmName ? <h1 className='firm-heading'>WelCome to&nbsp;
            {firmName}
                       </h1> : null
           }
           
           <div className='login-container'>
            {
              !showLogout ? <>
               <span onClick={handleLogin}>Login /</span>
            <span onClick={handleRegister}> Register</span>
           

              </>:<span onClick={handleLogout}>
                Logout
              </span>
            }
           </div>
        </nav>
    </header>
  )
}

export default Navbar
