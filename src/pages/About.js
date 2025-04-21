import React from 'react';
import '../styles/FormStyles.css'; 
import { useNavigate } from 'react-router-dom';
const About = () => {
    const navigate = useNavigate();
  return (
    <div className="about-container">
      <div className="about-box">
   
     
        <h2>About Us</h2>
        <p>
          Welcome to our website! We are a team passionate about tech and design.
          Our goal is to deliver high-quality digital products that are simple, beautiful, and useful.
        </p>
        <p>
          Our journey started in 2023 with a small idea, and now we serve users across the globe.
          From frontend to backend, we focus on performance, UI/UX, and customer satisfaction.
        </p>
        
        <p>
          Thanks for visiting! ✨
        </p>
        
      </div>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
};

export default About;
