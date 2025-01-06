import React, {useEffect, useState} from 'react';
import { Link} from 'react-router-dom';

const ProductList =()=>{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:4000/products");
            if (response.ok) {
                const result = await response.json();
                if (Array.isArray(result)) {
                    setProducts(result);
                } else {
                    setProducts([]);
                }
            } else {
                console.error("Erro ao buscar produtos:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error.message);
        }
    };
    const deleteProduct=async(id)=>{
        console.warn(id)
        let result = await fetch(`http://localhost:4000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result){
            getProducts();
        }
    }

    const searchHandle = async (event)=>{
        let key = event.target.value
        if (key){
            let result = await fetch(`http://localhost:4000/search/${key}`);
            result = await result.json()
            if (result){
                setProducts(result)
            }
        }
        else{
            getProducts();
        }
    }

    return(
        <div className="product-list">
            <h3> Product List</h3>
            <input type="" className='search-product-box' placeholder='Search Product' 
            onChange={searchHandle}/>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Brand</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.map((item, index) =>
                    <ul key={item._id || index}>
                        <li> {index+1} </li>
                        <li> {item.name} </li>
                        <li> {item.price} </li>
                        <li> {item.brand} </li>
                        <li> {item.category} </li>
                        <li> <button onClick={()=>deleteProduct(item._id)}> Delete </button>
                            <Link to={"/update/"+item._id}> Update </Link>
                        </li>
                    </ul>
                )
            }
        </div>
    )
}

export default ProductList;