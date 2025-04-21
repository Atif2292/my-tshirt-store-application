import React from 'react';
import '../styles/FormStyles.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate();
  return (
    <div className="contact-wrapper">
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you! Please fill out the form below:</p>
        <form>
          <label>Name:</label>
          <input type="text" placeholder="Your name" />
          
          <label>Email:</label>
          <input type="email" placeholder="Your email" />
          
          <label>Message:</label>
          <textarea placeholder="Your message"></textarea>
          
          <button type="submit">Send</button>
        </form>
      </div>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
};

export default Contact;
