import React, {useState} from 'react';

const AddProduct =() =>{
    const[name,setName] = useState("");
    const[price,setPrice] = useState("");
    const[brand,setBrand] = useState("");
    const[category,setCategory] = useState("");
    const[error,setError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    //FUNCTIONS
    function isNumeric(str) {
        if (typeof str !== "string") return false; // só processamos strings
        return !isNaN(str) && !isNaN(parseFloat(str)); // garante que a string pode ser convertida para número
    }

    const addProduct = async()=>{
        if (!name || !price || !brand || !category){
            setError(true)
            if (price && (!isNumeric(price) || parseFloat(price) <= 0)) {
                setPriceError(true);
            }
            return false
        }

        console.warn(name,price,brand,category);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.warn(userId);
        let result = await fetch("http://localhost:4000/add-product", {
            method:'post',
            body: JSON.stringify({name, price, brand, category, userId}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
    }
    return(
        <div className='product'>
            <h1> Add Product</h1>
            <input type="text" className="inputBox" placeholder="Enter Product name"
                value={name} onChange={(e)=>setName(e.target.value)}/> 
            {error && !name && <span className="invalid-input"> Enter valid name</span>}

            <input type="text" className="inputBox" placeholder="Enter Product price"
                value={price} onChange={(e)=>setPrice(e.target.value)}/> 
            {error && !price && <span className="invalid-input"> Enter valid price</span>}
            {priceError && price && <span className="invalid-input"> Price must be a valid number greater than 0</span>}

            <input type="text" className="inputBox" placeholder="Enter Product brand"
                value={brand} onChange={(e)=>setBrand(e.target.value)}/> 
            {error && !brand && <span className="invalid-input"> Enter valid brand</span>}

            <input type="text" className="inputBox"placeholder="Enter Product category"
                value={category} onChange={(e)=>setCategory(e.target.value)}/> 
            {error && !category && <span className="invalid-input"> Enter valid category</span>}

            <button onClick={addProduct} className="appButton" type="button"> Add Product</button>
        </div>
    )
}

export default AddProduct