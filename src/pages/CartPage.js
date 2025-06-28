import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: '', email: '', phone: '',
    address: '', pincode: '', city: '', state: ''
  });

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
    updateCart(updatedCart);
  };

  const changeQty = (id, amount) => {
    const updated = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, Number(item.quantity) + amount) }
        : item
    );
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) =>
    sum + (Number(item.price) * Number(item.quantity) || 0), 0);

  const handlePayment = async () => {
    // Form validation
    const { name, email, phone, address, pincode, city, state } = user;

    if (!name || !email || !phone || !address || !pincode || !city || !state) {
      alert("Please fill all the fields.");
      return;
    }
    if (!/^[0-9]{6}$/.test(pincode)) {
      alert("Pincode must be a 6-digit number.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Phone must be 10 digits.");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      alert("Only Gmail addresses allowed.");
      return;
    }

    try {
      setLoading(true);

      const { data: order } = await axios.post('https://tshirt-backend-1.onrender.com/create-order', {
        amount: total * 100
      });

      const options = {
        key: "rzp_live_dl2My0lbtJeZxN",
        amount: order.amount,
        currency: "INR",
        name: "StyleByBuddy",
        description: "Order Payment",
        image: "/logo01.png",
        order_id: order.id,
        handler: function (response) {
          setLoading(false);
          alert("Payment Successful! Thank you.");

          const latestCart = JSON.parse(localStorage.getItem("cart")) || [];
          const latestTotal = latestCart.reduce((sum, item) =>
            sum + (Number(item.price) * Number(item.quantity) || 0), 0);

          const form = document.createElement('form');
          form.action = "https://formsubmit.co/buddycollectionhub@gmail.com";
          form.method = "POST";
          form.style.display = "none";
const addField = (name, value) => {
  const input = document.createElement('input');
  input.name = name;
  input.value = value;
  input.type = "hidden";
  form.appendChild(input);
};

// User Info
addField("Name", name);
addField("Email", email);
addField("Phone", phone);
addField("Address", address);
addField("Pincode", pincode);
addField("City", city);
addField("State", state);

// Order Summary
addField("Order Summary", latestCart.map(item =>
  `${item.name} (Size: ${item.size || 'M'}) × ${item.quantity} = ₹${item.price * item.quantity}`
).join("\n") + `\n\nTotal: ₹${latestTotal}`);

// ✅ User will also receive confirmation
addField("_replyto", email);
const orderSummary = latestCart.map(item =>
  `${item.name} (Size: ${item.size || 'M'}) × ${item.quantity} = ₹${item.price * item.quantity}`
).join("\n") + `\n\nTotal: ₹${latestTotal}`;

addField("_autoresponse", `Thank you for your order!\n\nHere’s your order summary:\n\n${orderSummary}`);

// FormSubmit settings
addField("_captcha", "false");
addField("_template", "table");


          document.body.appendChild(form);
          form.submit();

          localStorage.setItem("orderSummary", JSON.stringify({
            ...user,
            cart: latestCart,
            total: latestTotal,
            paymentId: response.razorpay_payment_id
          }));

          localStorage.removeItem("cart");
          setCart([]);

          setTimeout(() => {
            window.location.href = "/order-summary";
          }, 1000);
        },
        prefill: {
          name, email, contact: phone
        },
        theme: { color: "#000" }
      };

      const razor = new window.Razorpay(options);
      razor.open();
      setLoading(false);

    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-item" key={item.id + item.size}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Size: <strong>{item.size || 'M'}</strong></p>
                <p>₹{item.price} × {item.quantity}</p>
                <div>
                  <button onClick={() => changeQty(item.id, -1)}>-</button>
                  <button onClick={() => changeQty(item.id, 1)}>+</button>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          {!showForm ? (
            <button className='checkout-btn' onClick={() => setShowForm(true)}>
              Checkout
            </button>
          ) : (
            <div className="user-form">
              <h3>Enter your details</h3>

              <input type="text" placeholder="Name" value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })} />
              <input type="email" placeholder="Email" value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })} />
              <input type="tel" placeholder="Phone" value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })} />
              <input placeholder="Address" value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })} rows={3} />
              <input type="text" placeholder="Pincode" value={user.pincode}
                onChange={(e) => setUser({ ...user, pincode: e.target.value })} />
              <input type="text" placeholder="City" value={user.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })} />
              <input type="text" placeholder="State" value={user.state}
                onChange={(e) => setUser({ ...user, state: e.target.value })} />

              <button className='checkout-btn' onClick={handlePayment}>
                Pay with Razorpay
              </button>
            </div>
          )}
        </>
      )}

      {loading && (
        <div className="loading-spinner">
          <p>Processing Payment...</p>
          <div className="spinner"></div>
        </div>
      )}

      <Link className='back-btn' to="/product-grid">← Back to Products</Link>
    </div>
  );
}

export default CartPage;
