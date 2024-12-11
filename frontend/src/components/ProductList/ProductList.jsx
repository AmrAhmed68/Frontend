import './ProductList.css'
import React , {useEffect , useState} from 'react'
import ProductCard from '../ProductCard/ProductCard'

function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
    } , [])
    
    const Product = products.map((e) => {
        return (
            <ProductCard key={e.id} data= {e}/>
        )
    })

    return (
    <div className='container'>
        {Product}
    </div>
  )
}

export default ProductList
