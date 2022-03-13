import React, {} from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../../components/HeaderComponent';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  
  const onClick = () => {
    navigate('/experiments');
  };

  return(
    <div className="welcome-bg">
      <div className="welcome-div-bg">
        <HeaderComponent showBg={false}/>
        <div className="welcome-box">
          <h1 className="welcome-text">Make Creating Experiments Easy</h1>
          <p className="intro-text">Get all your experiment forms in one system.</p>
          <p className="intro-text">Boost your productivity with Doorsteps MasterForm.</p>
          <button className="explore-btn" onClick={onClick}>Explore more</button>
        </div>
      </div>
    </div>

  );
};

export default WelcomePage;