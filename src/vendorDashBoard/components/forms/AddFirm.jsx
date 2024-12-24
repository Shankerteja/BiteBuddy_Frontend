import React, { useState } from 'react'
import { API_URL } from '../Apis/Apis';

const AddFirm = () => {

    const [firmName,setFirmName]=useState("");
    const [area,setArea]=useState("");
    const [offer,setOffer]=useState("");
    const [image,setImage]=useState(null);
    const [category,setCategory]=useState("");
    const [region,setRegion]=useState([])

    const handleCategory=(event)=>{
        const categoryValue=event.target.value;

        if(category.includes(categoryValue)){
            setCategory(category.filter((item)=>item!==categoryValue));
        }else{
            setCategory([...category,categoryValue])
        }
    }

    const handleRegion=(event)=>{
        const regionValue=event.target.value;
        if(region.includes(regionValue)){
            setRegion(region.filter((item)=>item!==regionValue));
        }else{
            setRegion([...region,regionValue]);
        }
    }

    const handleAddFirm=async (event)=>{
        event.preventDefault();
        const jwtToken=localStorage.getItem("token")
        if(!jwtToken){
            alert("User Not Authenticated")
            return
        }
        try {

            const formData=new FormData();
            formData.append("firmName",firmName);
            formData.append("area",area);       
          formData.append("image",image)
            formData.append("offer",offer)
         category.forEach(element => {
            formData.append("category",element)
            
         });
         region.forEach((item)=>{
            formData.append("region",item)
         })

         const options={
            method:'POST',
            headers:{
                'authorization':`Bearer ${jwtToken}`
            },
            body:formData
         }

         const response=await fetch(`${API_URL}/firm/add-firm`,options);
         const data=await response.json()
         if(response.ok){
            setFirmName("")
            setArea("")
            setCategory([])
            setImage(null)
            setOffer("")
            setRegion([])
            const firmId=data.firmId;
            const firmname=data.firmNameInFirm
         localStorage.setItem("firmId",firmId);
         localStorage.setItem("firmName",firmname)
            alert("firm Add SuccessFully")
            window.location.reload()
         }else if(data.message==="Vendor can have Only one Firm"){
            setFirmName("")
            setArea("")
            setCategory([])
            setImage(null)
            setOffer("")
            setRegion([])
            alert("Vendor can have Only one Firm 🙌")

         }else{
            alert("Add Firm Failed!")
         }   
        } catch (error) {
            console.error(error)
            alert("firm add Filed")
            
        }

    }

  return (
    <div className='add-firm-container'>
        <h1 className='heading'>
            Add Firm
        </h1>
        <form onSubmit={handleAddFirm}>
            <label>Firm Name</label>
            <input type='text' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
            <label>Area</label>
            <input type='text' value={area} onChange={(e)=>setArea(e.target.value)}/>
            <label>Category</label>
            <div className='category-container'>
                <div>
                    <label>Veg</label>
                    <input type='checkbox'  value="veg" checked={category.includes("veg")} onChange={handleCategory}/>
                </div>
                <div>
                    <label>Non-veg</label>
                    <input type='checkbox' value="non-veg" checked={category.includes("non-veg")} onChange={handleCategory}/>
                </div>

            </div>
            <label>Offer</label>
            <input type='text' onChange={(e)=>setOffer(e.target.value)}/>
            <label>Region</label>
            <div className='region-container'>
                <div>
                    <label>
                        South-Indian
                    </label>
                    <input type='checkbox' value="south-indian" checked={region.includes("south-indian")} onChange={handleRegion}/>
                </div>
                <div>
                    <label>
                        North-Indian
                    </label>
                    <input type='checkbox' value="north-indian" checked={region.includes("north-indian")} onChange={handleRegion}/>
                </div>
                <div>
                    <label>
                       Chinese
                    </label>
                    <input type='checkbox' value="chinese" checked={region.includes("chinese")} onChange={handleRegion}/>
                </div>
                <div>
                    <label>
                      Bakery
                    </label>
                    <input type='checkbox' value="bakery" checked={region.includes("bakery")} onChange={handleRegion}/>
                </div>
            </div>
            <label>Firm Image</label>
            <input type='file' onChange={(e)=>setImage(e.target.files[0])}/>
            <button type='submit'>
                Submit
            </button>
        </form>
      
    </div>
  )
}

export default AddFirm
