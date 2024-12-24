import React from 'react'

const Sidebar = (props) => {

    const {handleAddFirm,handleAddProduct,handleShowProducts,showAddNav}=props
  return (
    <div className='sidebar'>
     <ul>
      {
        showAddNav ? <li onClick={handleAddFirm}>Add Firm</li> :null
      }
       
        <li onClick={handleAddProduct}>Add Products</li>
        <li onClick={handleShowProducts}>All Products</li>
        <li>User Details</li>

     </ul>
    </div>
  )
}

export default Sidebar
