import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import FormComponent from './FormComponent';
import AddExperimentPage from '../pages/add-experiment';
import AdminPage from '../pages/admin';
import WelcomePage from '../pages/welcome';
import ExperimentsPage from '../pages/experiments';
import forms from '../api/forms';

const App = (props) => {
  const [allExperiments, setAllExperiments] = useState([]);
  const [refetchData, setRefetchData] = useState(false);

  // Get all experiment data
  useEffect(() => {
    const getAllExperiments = async () => {
      const { data } = await forms.get('/experiment');
      setAllExperiments(data);
    }
    if (allExperiments.length === 0 || refetchData) {
      getAllExperiments();
      setRefetchData(false);
    }
  }, [refetchData]);

  // Dynamically generate routes
  const createRoutes = () => {
    if(allExperiments.length > 0) {
      return allExperiments.map((experiment) => {
        const pathName = experiment.title.toLowerCase().replaceAll(' ', '-');
        return <Route key={experiment.id} path={`/${pathName}`} element={<FormComponent experimentId={experiment.id} experimentTitle={experiment.title}/>}></Route>;
      });
    } else {
      return null;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/experiments" element={<ExperimentsPage allExperiments={allExperiments} />}></Route>
        <Route 
          path="/add-experiment" 
          element={<AddExperimentPage setRefetchData={setRefetchData}/>}
        >
        </Route>
        <Route 
          path="/admin" 
          element={<AdminPage setRefetchData={setRefetchData} allExperiments={allExperiments}/>}
        >
        </Route>
        {createRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default App;