import React from "react";
import "../styles/Policy.css";
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p>
        Your privacy matters to us. We don’t share your personal data with third parties, except for payment and delivery services. 
        All information is kept confidential and secure.
      </p>
            <Link className='back-btn 'to="/">← Back to Products</Link>

    </div>
  );
};

export default PrivacyPolicy;
