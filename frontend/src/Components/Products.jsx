import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    getProducts();
  },[products]);

  const getProducts = async ()=>{
     let result = await fetch("http://localhost:5000/getProducts");
     result = await result.json();
     
     setProducts(result);
  }
  
  const deleteProduct = async (e)=>{
      let id = e.currentTarget.id;
      let name = document.getElementById(`name${id}`).innerText;
      let price = document.getElementById(`price${id}`).innerText;
      let category = document.getElementById(`category${id}`).innerText;
     
      let result = fetch("http://e-commerce-fhxo.onrender.com/deleteProduct",{
          method: "delete",
          body: JSON.stringify({name, price,category}),
        headers : {
            "Content-Type":"application/json"
        }
      });

      if(result){
        getProducts();
      }
  }
  
  return (
    <div className='productList'>
        <h3>Product List</h3>
        <ul>
            <li>S. No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Operation</li>
        </ul>
        {
            products.map((item,index)=>
            <ul key={index}>
                <li>{++index}</li>
                <li id={`name${index}`} >{item.name}</li>
                <li id={`price${index}`}> {item.price}</li>
                <li id={`category${index}`}>{item.category}</li>
                <li><button id={`${index}`} onClick={deleteProduct}>Delete</button>
                <Link to="update">Update</Link>
                </li>
            </ul>
            )
        }
    </div>
  )
}

export default Products