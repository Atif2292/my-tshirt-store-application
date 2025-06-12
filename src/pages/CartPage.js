  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import '../styles/CartPage.css';
  import axios from 'axios';

  function CartPage() {
    const [cart, setCart] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState({ name: '', email: '', phone: '' });

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
      return isNaN(price) || isNaN(quantity) ? sum : sum + price * quantity;
    }, 0);
  const handlePayment = async () => {
    if (!user.name.trim() || !user.email.trim() || !user.phone.trim()) {
      alert("Please fill all the fields.");
      return;
    }

    if (!/^[0-9]+$/.test(user.phone)) {
      alert("Phone number should contain only digits.");
      return;
    }

    if (!user.email.endsWith("@gmail.com")) {
      alert("Email must be a valid Gmail address (e.g. example@gmail.com).");
      return;
    }

    // Razorpay integration first
    try {
      const { data: order } = await axios.post('http://localhost:5000/create-order', {
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
  alert("Payment Successful! Thank you.");

  const latestCart = JSON.parse(localStorage.getItem("cart")) || [];
  const latestTotal = latestCart.reduce((sum, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    return isNaN(price) || isNaN(quantity) ? sum : sum + price * quantity;
  }, 0);


          // Now send form to Gmail after payment success
          const form = document.createElement('form');
          form.action = "https://formsubmit.co/mohdatif2291@gmail.com";
          form.method = "POST";
          form.style.display = "none";

          const addField = (name, value) => {
            const input = document.createElement('input');
            input.name = name;
            input.value = value;
            input.type = "hidden";
            form.appendChild(input);
          };

          addField("Name", user.name);
          addField("Email", user.email);
          addField("Phone", user.phone);
          addField("Order Summary", cart.map(item =>
            `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`
          ).join("\n") + `\n\nTotal: ₹${total}`);
          addField("_captcha", "false");
          addField("_template", "table");

          document.body.appendChild(form);
          form.submit();
 localStorage.setItem("orderSummary", JSON.stringify({
    name: user.name,
    email: user.email,
    phone: user.phone,
    cart: latestCart,
    total: latestTotal,
    paymentId: response.razorpay_payment_id
  }));

  localStorage.removeItem("cart");
  setCart([]);

         setTimeout(() => {
    window.location.href = "/";
  }, 1000); 
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone
        },
        theme: { color: "#000" }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
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
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
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
                <input
                  type="text"
                  placeholder="Name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              
  <input
      type="hidden"
      name="order_summary"
      value={
        cart.map(item => `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`).join('\n') + `\n\nTotal: ₹${total}`
      }
    />

    {/* Required to avoid bot submissions */}
    <input type="hidden" name="_captcha" value="false" />


                <button className='checkout-btn' onClick={handlePayment}>Pay with Razorpay</button>
              </div>
            )}
          </>
        )}

        <Link className='back-btn' to="/">← Back to Products</Link>
      </div>
    );
  }

  export default CartPage;
