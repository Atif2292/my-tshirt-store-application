import React from 'react';
import '../styles/FormStyles.css';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-wrapper">
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you. For any queries or support, use the form or reach us directly:</p>

        <div className="contact-details">
          <p><strong>Email:</strong> help@stylebybuddy.com</p>
          <p><strong>Phone:</strong> +91-9876543210</p>
        </div>

        <form>
          <label>Name:</label>
          <input type="text" placeholder="Your name" required />

          <label>Email:</label>
          <input type="email" placeholder="Your email" required />

          <label>Message:</label>
          <textarea placeholder="Your message" rows="5" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
};

export default Contact;
