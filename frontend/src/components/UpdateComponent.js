import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'

const UpdateProduct =() =>{
    const[name,setName] = useState("");
    const[price,setPrice] = useState("");
    const[brand,setBrand] = useState("");
    const[category,setCategory] = useState("");
    const params = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
        getProductDetails();
    }, [])

    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:4000/product/${params.id}`, {
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.warn(result);
        setName(result.name);
        setPrice(result.price);
        setBrand(result.brand);
        setCategory(result.category);
    }

    const updateProduct = async()=>{
        console.warn(name,price,brand,category)
        let result = await fetch(`http://localhost:4000/product/${params.id}`, {
            method:'Put',
            body: JSON.stringify({name, price, brand, category}),
            headers:{
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result){
            navigate("/")
        }
    }
    return(
        <div className='product'>
            <h1> Update Product</h1>
            <input type="text" className="inputBox" placeholder="Enter Product name"
                value={name} onChange={(e)=>setName(e.target.value)}/> 

            <input type="text" className="inputBox" placeholder="Enter Product price"
                value={price} onChange={(e)=>setPrice(e.target.value)}/> 

            <input type="text" className="inputBox" placeholder="Enter Product brand"
                value={brand} onChange={(e)=>setBrand(e.target.value)}/> 

            <input type="text" className="inputBox"placeholder="Enter Product category"
                value={category} onChange={(e)=>setCategory(e.target.value)}/> 

            <button onClick={updateProduct} className="appButton" type="button"> Update Product</button>
        </div>
    )
}

export default UpdateProduct;