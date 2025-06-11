import React from "react";
import "../styles/Policy.css";
import { Link } from 'react-router-dom';


const TermsAndConditions = () => {
  return (
    <div className="policy-container">
      <h1>Terms & Conditions</h1>
      <p>
        By using our website, you agree to our terms. All orders must be paid in full before delivery.
        Any misuse or illegal activity is strictly prohibited. We may update our terms at any time.
      </p>
            <Link className='back-btn 'to="/">← Back to Products</Link>

    </div>
  );
};

export default TermsAndConditions;
