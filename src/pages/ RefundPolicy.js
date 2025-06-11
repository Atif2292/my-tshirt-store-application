import React from "react";
import "../styles/Policy.css";
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Refund & Cancellation Policy</h1>
      <p>
        Cancellations are allowed within 24 hours of placing the order. Refunds are processed within
        5-7 business days. No refunds for used or damaged products.
      </p>
            <Link className='back-btn 'to="/">← Back to Products</Link>

    </div>
  );
};

export default RefundPolicy;
