import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const HeaderComponent = ({ showBg }) => {
  return (
    <div className={ showBg ? 'header-bg' : ''}>
      <div className="nav-container">
        <h1 className="logo-text">Doorsteps</h1>
        <div className="nav-box">
          <Link to="/experiments" className="nav-text">Experiments</Link>
          <Link to="/add-experiment" className="nav-text">Add Experiments</Link>
          <Link to="/admin" className="nav-text">Manage</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;