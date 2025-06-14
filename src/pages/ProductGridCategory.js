import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductGridCategory.css';

function ProductGridCategory({ title, data }) {
  const navigate = useNavigate();

  return (
    <div className="product-grid-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      <h2>{title}</h2>

      <div className="product-section">
        {data.map((product) => (
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
}

export default ProductGridCategory;
