import React from 'react'
import Cookies from 'js-cookie'
const Welcom = () => {
  const username=Cookies.get('Username');

  return (
    <div>
      <img src='https://img.freepik.com/premium-vector/cartoon-happy-chef-with-ok-sign_29190-5460.jpg?w=740' className='welcome-image'/>
      <h1 className='user-name'>
        Hello {username}
      </h1>
    </div>
  )
}

export default Welcom
