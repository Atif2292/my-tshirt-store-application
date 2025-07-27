import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/OrderSummary.css';

function OrderSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orderSummary"));
    setSummary(data);
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="order-summary-page">
      <h1>Thank you for your order!</h1>
      <h3>Order ID: {summary.orderId}</h3>
      <h3>Payment ID: {summary.paymentId}</h3>

      <h4>Order Details:</h4>
      <ul>
        {summary.cart.map((item, i) => (
          <li key={i}>
            {item.name} (Size: {item.size || 'M'}, Color: {item.color || 'N/A'}) x {item.quantity} = ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>

      <h3>Total: ₹{summary.total}</h3>

      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default OrderSummary;
