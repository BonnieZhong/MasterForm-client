import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';

import HeaderComponent from '../HeaderComponent';
import BasicInfoComponent from '../BasicInfoComponent';
import TextFieldComponent from '../TextFieldComponent';
import DropdownComponent from '../DropdownComponent';
import ThankYouPage from '../../pages/thankyou';
import forms from '../../api/forms';
import '../App.css';
import './index.css';

const FormComponent = ({ experimentId, experimentTitle }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [textFieldQuestions, setTextFieldQuestions] = useState([]);
  const [selectQuestions, setSelectQuestions] = useState([]);
  const [clientInfo, setClientInfo] = useState({
    firstName: '', lastName: '', phone: '', email: ''
  });
  const [response, setResponse] = useState();
  const [clientResponses, setClientResponses] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  // Get question data from an API
  useEffect(() => {
    // Get questions by its ID
    const getQuestions = async (questionSet) => {
      let queryParams = [];
      questionSet.forEach(item => {
        let param = 'id='+item;
        queryParams.push(param);
      });
      const queryStr = queryParams.join('&');
      const response = await forms.get(`/questions/?${queryStr}`);
      setAllQuestions(response.data);
    };
    // Get a set of question ID for current experiment form
    const getForms = async () => {
      const response = await forms.get(`/experiments/?id=${experimentId}`);
      setDisabled(response.data[0].disabled);
      const questionSet = response.data[0].questionIds;
      getQuestions(questionSet);
    };
    getForms();
  }, []);

  // Process question data
  useEffect(() => {
    if (allQuestions !== undefined && allQuestions.length > 0) {
      let textFieldArr = [];
      let selectArr = [];
      allQuestions.forEach(question => {
        if (question.type === 'textfield') {
          textFieldArr.push(question);
        } else {
          selectArr.push(question);
        } 
      });
      setSelectQuestions(selectArr);
      setTextFieldQuestions(textFieldArr);
    }
  }, [allQuestions]);

  // Get client's name, phone and email from a child component - BasicInfoComponent
  const set = name => {
    return ({target: { value }}) => {
      setClientInfo(oldValues => ({...oldValues, [name]: value}));
    }
  };

  // Process client responses for text field questions
  useEffect(() => {
    if(response !== undefined && response) {
      if(clientResponses.length === 0) {
        // Add the first new response
        let clientResponsesCopy = [...clientResponses, response];
        setClientResponses(clientResponsesCopy);
      } else {
        // Process subsequence responses
        let duplicated = false;
        let clientResponsesCopy = [...clientResponses];
        clientResponsesCopy.forEach(item => {
          if(item.question === response.question) {
            // Update a response
            item.response = response.response;
            duplicated = true;
          }
        })
        // Add a new response
        if(!duplicated) {
          clientResponsesCopy.push(response);
          setClientResponses(clientResponsesCopy);
        }
      }
    }
  }, [response]);

  // Submit form data to Server
  const onSubmit = async (event) => {
    event.preventDefault();
    const data = { 
      'ClientInfo': clientInfo,
      'QuestionResponses': clientResponses
    };
    const response = await forms.post('/forms', data);
    console.log(response.data);
    setIsSuccess(true);
  }

  const renderContent = () => {
    if (isSuccess) {
      return <ThankYouPage />;
    } else {
      return (
        <div className="div-container">
          <form onSubmit={onSubmit}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <h1 className="form-title">{`${experimentTitle} form`}</h1>
                {/* Client basic info */}
                <Grid item width="100%">
                  <BasicInfoComponent clientInfo={clientInfo} set={set} />
                </Grid>
    
                {/* Text field questions */}
                <Grid item width="100%">
                  {textFieldQuestions.length > 0 ? (
                    textFieldQuestions.map((item, index) => (
                      <TextFieldComponent 
                        key={index} 
                        question={item.question} 
                        multiline={item.multiline}
                        setResponse={setResponse}
                      />
                    ))
                    ) : (null)}
                </Grid>
                
                {/* Select field questions */}
                <Grid item width="100%">
                  {selectQuestions.length > 0 ? (
                    selectQuestions.map((item, index) => (
                      <DropdownComponent 
                        key={index} 
                        question={item.question} 
                        options={item.options}
                        setResponse={setResponse}
                      />
                    ))
                    ) : (null)}
                </Grid>
    
                <Grid item width="100%" style={{ textAlign: "right", marginTop: "1rem"}}>
                  <Button variant="contained" type="submit">Submit</Button>
                </Grid>
              </Grid>
          </form>
        </div>
      );
    }
  };

  const renderPage = () => {
    if (disabled) {
      return (<div className='div-container'>
        <h1 className="loading-text">Sorry, this experiment form is Not Available.</h1>
      </div>);
    } else {
      return renderContent();
    }
  };

  return (
    <>
      <HeaderComponent showBg={true}/>
      {allQuestions.length > 0 ? renderPage() : (
        <h1 className="loading-text">Loading you experiments...</h1>
      )}
    </>
  );
};

export default FormComponent;