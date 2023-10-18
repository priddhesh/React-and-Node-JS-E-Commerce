import React, {useState} from 'react'

function AddProduct() {
  const [name, setName ] = useState("");
  const [price, setPrice ] = useState("");
  const [category, setCategory ] = useState("");
  const [company, setCompany ] = useState("");
  const [error, setError ] = useState(false);

  const addProduct = async ()=>{
    if(!name || !price || !company || !category){
        setError(true);
        return false;
    }

    const userID = JSON.parse(localStorage.getItem("user")).name;
    let result = await fetch("http://e-commerce-fhxo.onrender.com/addProduct",{
        method: "post",
        body: JSON.stringify({name, price,category,company,userID}),
        headers : {
            "Content-Type":"application/json"
        }
    })
    result = await result.json();
  }

  return (
    <div className='product'>
        <h1>Add Product</h1>
        <input onChange={(e)=> setName(e.target.value)} className='inputBox' type='text' placeholder='Enter product name' value={name}/>
        {error && !name && <span className='invalidInput'>Enter valid name</span>}
        <input onChange={(e)=>setPrice(e.target.value)} className='inputBox'  type='text' placeholder='Enter product price' value={price}/>
        {error && !price && <span className='invalidInput'>Enter valid price</span>}
        <input onChange={(e)=> setCategory(e.target.value)} className='inputBox'  type='text' placeholder='Enter product category' value={category}/>
        {error && !category && <span className='invalidInput'>Enter valid category</span>}
        <input onChange={(e)=>setCompany(e.target.value)} className='inputBox'  type='text' placeholder='Enter product company' value={company}/>
        {error && !company && <span className='invalidInput'>Enter valid company</span>}
       <button onClick={addProduct} className='appButton'>Add Product</button>
    </div>
  )
}

export default AddProduct