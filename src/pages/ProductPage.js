import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tshirts from '../data';
import '../styles/ProductView.css';
import anime from '../animeData';
import oneliner from '../onelinerData';
import oversized from '../oversizedData';
function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cartItemCount, setCartItemCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M'); // default size M
const allProducts = [...tshirts, ...anime, ...oneliner, ...oversized]; 
 const updateCartItemCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(itemCount);
  };

  useEffect(() => {
  updateCartItemCount();
  window.scrollTo(0, 0); // optional scroll to top
}, [id]);

const tshirt = allProducts.find(t => t.id === id);
  if (!tshirt) return <p>T-shirt not found!</p>;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const alreadyInCart = cart.find(item => item.id === tshirt.id && item.size === selectedSize);
    if (!alreadyInCart) {
      cart.push({
        ...tshirt,
        price: Number(tshirt.price),
        quantity: 1,
        size: selectedSize // added selected size
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
    } else {
      const updatedCart = cart.map(item =>
        item.id === tshirt.id && item.size === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('Quantity increased in cart!');
    }
    updateCartItemCount(); // update count immediately
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="product-view">
      <img src={tshirt.image} alt={tshirt.name} />
      <div className="info">
        <h2>{tshirt.name}</h2>
        <p className="price">₹{tshirt.price}</p>

        {/* Size Selection */}
        <div className="size-selector">
          <label>Select Size:</label>
          <div className="size-options">
            {['S', 'M', 'L', 'XL'].map(size => (
              <button
                key={size}
                className={selectedSize === size ? 'size-btn selected' : 'size-btn'}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="add-to-cart-btn" onClick={addToCart}>
          Add to Cart
        </button>

        <button className="buy-btn" onClick={goToCart}>
          Go to Cart
        </button>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h3>You May Also Like</h3>
        <div className="related-list">
          {allProducts
  .filter(item => item.id !== tshirt.id)
  .slice(0, 3)
  .map(item => (

              <div
                key={item.id}
                className="related-item"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <span>₹{item.price}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Cart Icon */}
      <div className="cart-icon" onClick={goToCart}>
        🛒
        {cartItemCount > 0 && (
          <span className="cart-item-count">{cartItemCount}</span>
        )}
      </div>

      <button className='back1-btn' onClick={() => navigate('/product-grid')}>
        ← Back to Products
      </button>
    </div>
  );
}

export default ProductPage;
