import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import FormComponent from './FormComponent/FormComponent';
import AddExperimentPage from '../pages/AddExperimentPage';
import AdminPage from '../pages/AdminPage';
import forms from '../api/forms';

const App = (props) => {
  const [allExperiments, setAllExperiments] = useState([]);

  useEffect(() => {
    const getAllExperiments = async () => {
      const { data } = await forms.get('/experiment');
      setAllExperiments(data);
    } 
    getAllExperiments();
  }, []);

  const createRoutes = () => {
    if(allExperiments.length > 0) {
      return allExperiments.map((experiment) => {
        const pathName = experiment.title.toLowerCase().replace(' ', '-');
        return <Route key={experiment.id} path={`/${pathName}`} element={<FormComponent experimentId={experiment.id}/>}></Route>;
      });
    } else {
      return null;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormComponent experimentId={2}/>}></Route>
        <Route path="/add-experiment" element={<AddExperimentPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        {createRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;