import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='not-found-container'>
      <img src='https://img.freepik.com/free-vector/404-concept-illustration_114360-26118.jpg?t=st=1735026403~exp=1735030003~hmac=b1585b75537df1a6eb7f5d87961921afa6474b4941305a9d3e57f75329060501&w=740' className='not-found-image'/>



<Link to='/' className='link'>
<h1 className='not-found-heading'>
GO BACK
</h1>
</Link>

    </div>
  )
}

export default NotFound
