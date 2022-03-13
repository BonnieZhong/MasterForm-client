import React, { useEffect, useState } from 'react';

import HeaderComponent from '../../components/HeaderComponent';
import CardComponent from './Card';
import '../../components/App.css';
import './index.css';

const ExperimentsPage = ({ allExperiments }) => {
  
  const [data, setData] = useState([]);

  const renderCard = () => {
    return data.map(experiment => {
      return <CardComponent key={experiment.id} experiment={experiment}/>
    })
  };

  useEffect(() => {
    if(allExperiments.length > 0) {
      setData(allExperiments);
    } else {
      console.log('Loading...');
    }
  }, [allExperiments]);

  return (
    <div>
      <HeaderComponent showBg={true} />
      <div className="div-container">
        <h1 className="experiment-title">Here are all your experiments...</h1>
        <div className="card-container">
          {renderCard()}        
        </div>
      </div>
    </div>
  );
};

export default ExperimentsPage;