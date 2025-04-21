import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tshirts from '../data';
import '../styles/Home.css';
import ReactSlider from 'react-slider';

const ProductGridPage = () => {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState([0, 5000]);
  const navigate = useNavigate();

  const filtered = tshirts.filter(
    (product) =>
      (category === 'All' || product.category === category) &&
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      product.price >= price[0] &&
      product.price <= price[1]
  );

  return (
    
    <div className="product-grid-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
  ← Back
</button>

        {/* Search Bar with Cart */}
        <div className="search-container">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <span className="cart-icon" onClick={() => navigate('/cart')}>
          🛒
        </span>
      </div>

      {/* Price Slider */}
      <div className="price-slider">
        <label>Price Range: ₹{price[0]} - ₹{price[1]}</label>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="thumb"
          trackClassName="track"
          min={0}
          max={5000}
          step={50}
          value={price}
          onChange={(val) => setPrice(val)}
          pearling
          minDistance={100}
        />
      </div>


      {/* Category Buttons */}
      <div className="category">
        <button onClick={() => setCategory('All')}>All</button>
        <button onClick={() => setCategory('Men')}>Men</button>
        <button onClick={() => setCategory('Women')}>Women</button>
      </div>

      {/* Product Grid */}
      <div className="product-section">
        {filtered.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button onClick={() => navigate(`/product/${product.id}`)}>View</button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ProductGridPage;
