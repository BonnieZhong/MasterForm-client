import React from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import ThankYouComponent from '../../components/ThankYouComponent';
import '../../components/App.css';

const ThankYouPage = () => {
  return (
    <>
    <HeaderComponent showBg={true}/>
    <div className="div-container">
      <ThankYouComponent />
    </div>
    </>
  );
};

export default ThankYouPage;