import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './Details.css'

function Details() {
    const {id} = useParams();
    const [product , setProduct] = useState([]);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
    },[id])

  return (
    <div className="details-container">
    <h1>{product.title}</h1>
    <img src={product.image} alt={product.title} />
    <p>{product.description}</p>
    <p>Price: ${product.price}</p>
    {/* <p>Rating: {product.rating}</p> */}
  </div>
  )
}

export default Details
