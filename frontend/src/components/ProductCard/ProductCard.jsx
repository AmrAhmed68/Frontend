import React  from 'react'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function ProductCard(props) {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/details/${props.data.id}`); 
      };

  return (
        <div className='card' onClick={handleDetailsClick} style={{cursor : "pointer"}}>
            <h2>{props.data.title}</h2>
            <img src={props.data.image} alt="" />
            <h3>{props.data.description}</h3>
            <p> Price : {props.data.price}</p>
            <p>{props.data.rating.rate}</p>
            <button onClick={handleDetailsClick}>
            <FontAwesomeIcon icon={faCartShopping} size="1x" />
            </button>
        </div>
    )
}

export default ProductCard
