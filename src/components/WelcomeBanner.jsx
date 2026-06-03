import React from 'react';
import './WelcomeBanner.css';
import buildingImage from '../assets/university_building.png';

const WelcomeBanner = ({ roleName }) => {
  return (
    <div className="welcome-banner-container">
      <div className="welcome-banner-content">
        <h2>Welcome back, {roleName}! 👋</h2>
        <p>Here's what's happening with Student Performance & Progress Intelligence Web Portal today.</p>
      </div>
      <div className="welcome-banner-image">
        <img src={buildingImage} alt="University Building" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
