import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function OrderSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('orderSummary'));
    if (data) {
      setSummary(data);
    }
  }, []);

  if (!summary) return <p>No order details found.</p>;

  return (
    <div style={styles.container}>
      <h2>🧾 Order Summary</h2>
      <p><strong>Name:</strong> {summary.name}</p>
      <p><strong>Email:</strong> {summary.email}</p>
      <p><strong>Phone:</strong> {summary.phone}</p>
      <p><strong>Payment ID:</strong> {summary.paymentId}</p>
      <hr />
      <h4>Items:</h4>
      <ul>
        {summary.cart.map((item, i) => (
          <li key={i}>
            {item.name} × {item.quantity} = ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ₹{summary.total}</h3>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
    fontFamily: "Poppins, sans-serif",
    background: "#fff",
    color: "#000",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  }
};

export default OrderSummary;
