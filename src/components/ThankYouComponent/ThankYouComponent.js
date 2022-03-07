import React from 'react';
import checkImage from './check_mark.png';
import './ThankYouComponent.css';

const ThankYouComponent = () => {
  return (
    <div className='box'>
      <img src={checkImage} alt='thank you' className='image'/>
      <h1 className='text'>Thank you</h1>
      <p className='paragraph-text'>The form was submitted successfully</p>
    </div>
  );
};

export default ThankYouComponent;