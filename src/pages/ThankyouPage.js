import React from 'react';
import ThankYouComponent from '../components/ThankYouComponent/ThankYouComponent';

const ThankYouPage = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <ThankYouComponent />
    </div>
  );
};

export default ThankYouPage;