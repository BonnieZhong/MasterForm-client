import React from 'react';

import FormComponent from '../components/FormComponent/FormComponent';

const MoversExperimentPage = ({ experimentId }) => {
  return (
    <FormComponent experimentId={experimentId}/>
  );
};

export default MoversExperimentPage;