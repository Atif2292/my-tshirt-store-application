import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(saved);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const changeQty = (id, amount) => {
    const updated = cart.map(item =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, Number(item.quantity) + amount),
          }
        : item
    );
    updateCart(updated);
  };
  
  const total = cart.reduce((sum, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
  
    if (isNaN(price) || isNaN(quantity)) return sum; // skip bad items
  
    return sum + price * quantity;
  }, 0);
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price} × {item.quantity}</p>
                <div>
                  <button onClick={() => changeQty(item.id, -1)}>- </button>
                  <button onClick={() => changeQty(item.id, 1)}>  +</button>
                  <button onClick={() => removeItem(item.id)}>Remove</button>

                </div>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
          <button className='checkout-btn ' onClick={() => alert('Proceeding to checkout...')}>Checkout</button>
        </>
      )}

      <Link className='back-btn 'to="/">← Back to Products</Link>
    </div>
  );
}

export default CartPage;
