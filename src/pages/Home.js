import React, { useEffect, useState } from 'react';
import tshirts from '../data';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [category, setCategory] = useState('All');
  const [filtered, setFiltered] = useState(tshirts);
  const navigate = useNavigate();

  useEffect(() => {
    setFiltered(
      category === "All" ? tshirts : tshirts.filter(t => t.category === category)
    );
  }, [category]);

  return (
    <div className="home-page">
      
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/product-grid">Shop</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
         <li><a href="/refund">RefundPolicy</a></li>
           <li><a href="/privacy">PrivacyPolicy</a></li>
             <li><a href="/terms">TermsAndConditions</a></li>
        </ul>
      </nav>

      {/* Logo above banner */}
      <div className="logo">
        <img src="/logo01.png" alt="StyleByBuddy Logo" />
      </div>

      {/* Hero Banner with Slider */}
      <div className="hero-banner">
        <div className="text-overlay">
          <h1 className="store-name">styleByBuddy</h1>
          <div className="tag">New Arrival</div>
        </div>
        <div className="slider">
          <div className="slides">
            <img src="/banner-01.jpg" alt="Tshirt Banner" />
            <img src="/banner-02.jpg" alt="Banner 2" />
          </div>
        </div>
      </div>

      {/* Section Heading */}
      <div className="section-heading">
        <h2>Our Latest Content</h2>
        <p>🛍️ From stylish t-shirts to the latest trends — we bring fashion right to your screen.</p>
        <p>🚀 Quality, comfort, and style – all in one place. Don't miss out on our fresh arrivals.</p>
        <p>💬 Have questions? Visit our Support or Contact Us page anytime!</p>
      </div>

      {/* Shop Now Button */}
      <button className="shop-btn" onClick={() => navigate('/product-grid')}>
        Shop Now
      </button>

      {/* About Us */}
      <div className="about-wrapper">
        <div className="about-box">
          <h2>About Us</h2>
          <p>
            Welcome to our website! We’re a team passionate about tech and design.
            Our goal is to deliver high-quality digital products that are simple, beautiful, and useful.
          </p>
          <p>
            Our journey started in 2023 with a small idea. Now we serve users across the globe.
            From frontend to backend, we focus on performance, UI/UX, and customer satisfaction.
          </p>
          <p>
            Thanks for visiting! ✨
          </p>
        </div>
      </div>

      {/* Contact Us */}
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
      </div>
     </div> )
}

export default Home;
