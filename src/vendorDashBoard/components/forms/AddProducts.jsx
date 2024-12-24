import React from 'react'
import { useState } from 'react';
import { API_URL } from '../Apis/Apis';

const AddProducts = () => {

    const [productName,setProductName]=useState("");
    const [price,setPrice]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState([]);
    const [bestseller,setBestSeller]=useState(false)
    const [image,setImage]=useState(null)

    const handleCategory=(event)=>{
        const categoryValue=event.target.value 
        if(category.includes(categoryValue)){
            setCategory(category.filter((item)=>item!==categoryValue))
        }else{
            setCategory([...category,categoryValue])
        }
    }
    const handleBestseller=(event)=>{
        const sellerValue=event.target.value ==='true'
        setBestSeller(sellerValue)

    }
    const handleAddProduct=async (event)=>{
        event.preventDefault()
        const firmId=localStorage.getItem("firmId")
        const jwtToken=localStorage.getItem("token");
        if(!jwtToken){
            alert("Invalid Access Token")
        }
        try {
            const formData=new FormData();
            formData.append("productName",productName)
            formData.append("price",price)
            formData.append("description",description)
            formData.append("image",image)
            formData.append("bestSeller",bestseller)
            category.forEach(element => {
                formData.append("category",element)
                
            });

            const options={
                method:'POST',
                headers:{
                    'authorization':`Bearer ${jwtToken}`
                },
                body:formData
            }

            const response =await fetch(`${API_URL}/product/add-product/${firmId}`,options)
            if(response.ok){
                setCategory([])
                setDescription("")
                setPrice("")
                setProductName("")
                setBestSeller(false)
                alert("product Add SuccessFully")
            }
        } catch (error) {
            alert("Product Failed")
            

            
        }
    }
  return (
    <div className='product-container'>
      <h1 className='heading'>
        Add Product
      </h1>
      <form onSubmit={handleAddProduct}>
        <label>
            Product Name
        </label>
        <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}/>
        <label>Price</label>
        <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <label>category</label>
        <div className='category-container'>
            <div>
                <label>veg</label>
                <input type='checkbox' value="veg" checked={category.includes("veg")} onChange={handleCategory}/>
            </div>
            <div>
                <label>
                    Non-veg
                </label>
                <input type='checkbox' value="non-veg" checked={category.includes("non-veg")} onChange={handleCategory}/>
            </div>
        </div>
        <label>Description</label>
        <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <label>
            BestSeller
        </label>
        <div className='bestseller-container'>
            <div>
                <label>
                    Yes
                </label>
                <input type='radio' value="true" checked={bestseller===true} onChange={handleBestseller}/>
            </div>
            <div>
                <label>
                    No
                </label>
                <input type='radio' value="false" checked={bestseller===false} onChange={handleBestseller}/>
            </div>
        </div>
        <label>
            Product Image
        </label>
        <input type='file'  onChange={(e)=>setImage(e.target.files[0])}/>
<button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddProducts
