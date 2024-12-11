import React, { useState } from 'react';
import './Search.css'; 


function Search() {
    const [filter, setFilter] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [productData, setProducts] = useState([])

    useState(() => {
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
    } , []) 

    const filteredProducts = productData.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase())
    );

    const handleInputChange = (e) => {
      setFilter(e.target.value);
      setIsModalVisible(true); 
    };
  
    const handleBlur = () => {
      setTimeout(() => setIsModalVisible(false), 200);
    };
  
    
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a product..."
        value={filter}
        onChange={handleInputChange}
        onFocus={() => setIsModalVisible(true)} 
        onBlur={handleBlur}
      />
      {isModalVisible && filter && (
        <div className="search-dropdown">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div className="search-item" key={item.id}>
                <img src = {item.image} alt={item.title}/>
                <h4>{item.title}</h4>
                <p>Price: ${item.price}</p>
              </div>
            ))
          ) : (
            <div className="no-results">No products found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
