import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Our React Website</h1>
        <p>A modern website built with React and JavaScript</p>
        <button className="cta-button">Get Started</button>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h3>Responsive Design</h3>
          <p>Our website looks great on all devices</p>
        </div>
        <div className="feature-card">
          <h3>Modern UI</h3>
          <p>Clean and intuitive user interface</p>
        </div>
        <div className="feature-card">
          <h3>Fast Performance</h3>
          <p>Optimized for speed and efficiency</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 