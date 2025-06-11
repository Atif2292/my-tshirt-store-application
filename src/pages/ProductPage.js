import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tshirts from '../data';
import '../styles/ProductView.css';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cartItemCount, setCartItemCount] = useState(0);
  const updateCartItemCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(itemCount);
  };

  useEffect(() => {
    updateCartItemCount();
  }, []); // Initial load to get the cart item count

  const tshirt = tshirts.find(t => t.id === id);
  if (!tshirt) return <p>T-shirt not found!</p>;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const alreadyInCart = cart.find(item => item.id === tshirt.id);
    if (!alreadyInCart) {
      cart.push({
        ...tshirt,
        price: Number(tshirt.price),  // make sure price is a number
        quantity: 1                   // add quantity
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
    } else {
      // increase quantity if already in cart
      const updatedCart = cart.map(item =>
        item.id === tshirt.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('Quantity increased in cart!');
    }
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

        <button className="add-to-cart-btn" onClick={addToCart}>
          Add to Cart
        </button>

        <button className="buy-btn" onClick={goToCart}>
          Go to Cart
        </button>
      </div>
       {/* Cart Icon */}
       <div className="cart-icon" onClick={goToCart}>
        🛒
        {cartItemCount > 0 && (
     <span className="cart-item-count">{cartItemCount}</span>)}
      </div>
<button className='back1-btn' onClick={() => navigate('/product-grid')}>
  ← Back to Products
</button>    </div>
  );
}

export default ProductPage;
