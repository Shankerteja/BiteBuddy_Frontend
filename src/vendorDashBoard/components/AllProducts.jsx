import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { API_URL } from './Apis/Apis'

const AllProducts = () => {

    const [products,setProducts]=useState([])
    const [loader,setLoader]=useState(true)
    const handelDeleteProducts=async (productId)=>{
        const jwtToken=localStorage.getItem('token')
       try {
        const options={
            method:'DELETE',
            headers:{
                'authorization':`Bearer ${jwtToken}`
            }

        }
        if(window.confirm("Are you Sure? Want to Delete product?")){
            const response=await fetch(`${API_URL}/product/${productId}`,options)
            if(response.ok){
                setProducts(products.filter((eachItem)=>eachItem._id!==productId))
            
                alert("Product Deleted SuccessFully😊")
            }
            else{
                alert("Product Not Deleleted🤷‍♂️")
            }
        }
        
       } catch (error) {
        alert("Product Not Deleleted🤷‍♂️")
        
       }
    }
    const getProducts=async ()=>{
        const firmId=localStorage.getItem("firmId")
        const jwtToken=localStorage.getItem("token")
        if(!firmId){
            alert("Products Not Found🙌")
            return 
        }
        const options={
            method:'GET',
            headers:{
                'authorization':`Bearer ${jwtToken}`
            }
        }
        const response=await fetch(`${API_URL}/product/${firmId}/products`,options)
     
        if(response.ok){
            const data=await response.json()
            console.log(data.products)
            setProducts(data.products)
            setLoader(false)
        
        }

    }
    useEffect(()=>{
        getProducts()

    },[])
  return (
  <>
  {
    loader ? <>
<TailSpin
  visible={true}
  height="80"
  width="80"
  color="orange"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </> :
      <div>
      {
          products.length===0 ?(
              <div>
          No products Found
      </div>
          ):(
        
              <table className='table-container'>
                  <thead>
                      <tr>
                          <th>
                              Product Name
                          </th>
                          <th>
                              Price
                          </th>
                          <th>
                              Image
                          </th>
                          <th>
                              Delete
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          products.map((eachItem)=>{
                              return (
                                  <tr key={eachItem._id}>
                                      <td>{eachItem.productName}</td>
                                      <td>{eachItem.price}</td>
                                      <td>
                                          {
                                              eachItem.image && (
                                                  <img src={`${API_URL}/uploads/${eachItem.image}`} alt={`${eachItem.productName}`} style={{width:'50px',height:'50px'}}/>
                                              )
                                          }
                                      </td>
                                      <td>
                                          <button className='delete-button' onClick={()=>handelDeleteProducts(eachItem._id)}>
                                              Delete
                                          </button>
                                      </td>
                                  </tr>
                              )
                          })
                      }
                  </tbody>
              </table>
          )
      }
            
          </div>
  }
  </>
  )
}

export default AllProducts
