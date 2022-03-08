import React, { useEffect, useState } from 'react';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import BasicInfoComponent from './BasicInfoComponent/BasicInfoComponent';
import TextFieldComponent from './TextFieldComponent/TextFieldComponent';
import DropdownComponent from './DropdownComponent/DropdownComponent';
import { Button, Grid } from '@mui/material';
import ThankYouPage from '../pages/ThankyouPage';

const App = (props) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [singleLineQuestions, setSingleLineQuestions] = useState([]);
  const [multilineQuestions, setMultilineQuestions] = useState([]);
  const [selectQuestions, setSelectQuestions] = useState([]);
  const [clientInfo, setClientInfo] = useState({
    firstName: "", lastName: "", phone: "", email: ""
  });
  const [response, setResponse] = useState();
  const [clientResponses, setClientResponses] = useState([]);
  
  // Get client data from a child component - BasicInfoComponent
  const set = name => {
    return ({target: { value }}) => {
      setClientInfo(oldValues => ({...oldValues, [name]: value}));
    }
  };

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
  

  useEffect(() => {
    console.log("FETCH DATA");
    fetch("https://7937451c-2155-4efd-b112-70b4d226ae43.mock.pstmn.io/property-report")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setAllQuestions(result);
        },
        (error) => {
          console.log(error);
        }
      )
  }, []);

  // TODO: combine single line and multiline into one array
  useEffect(() => {
    if (allQuestions !== undefined && allQuestions.length > 0) {
      let singleLineArr = [];
      let multilineArr = [];
      let selectArr = [];
      allQuestions.forEach(question => {
        if (question.type === "single line") {
          singleLineArr.push(question);
        } else if (question.type === "multiline") {
          multilineArr.push(question);
        } else {
          selectArr.push(question);
        }
      });

      setSelectQuestions(selectArr);
      setSingleLineQuestions(singleLineArr);
      setMultilineQuestions(multilineArr);
    }
  }, [allQuestions]);
  // console.log(singleLineQuestions, multilineQuestions, selectQuestions);
  

  return (
    <>
      <HeaderComponent />
      {/* <ThankYouPage /> */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item width="80%">
          <BasicInfoComponent clientInfo={clientInfo} set={set} />
        </Grid>

        <Grid item width="80%">
          {singleLineQuestions.length > 0 ? (
            singleLineQuestions.map((item, index) => (
              <TextFieldComponent 
                key={index} 
                question={item.question} 
                multiline={item.multiline} 
                setResponse={setResponse}
              />
            ))
            ) : (null)}
        </Grid>

        <Grid item width="80%">
          {multilineQuestions.length > 0 ? (
            multilineQuestions.map((item, index) => (
              <TextFieldComponent 
                key={index} 
                question={item.question} 
                multiline={item.multiline}
                setResponse={setResponse}
              />
            ))
            ) : (null)}
        </Grid>

        <Grid item width="80%">
          {selectQuestions.length > 0 ? (
            selectQuestions.map((item, index) => (
              <DropdownComponent key={index} question={item.question} options={item.options}/>
            ))
            ) : (null)}
        </Grid>

        <Grid item width="80%" style={{ textAlign: "right", marginTop: "1rem"}}>
          <Button variant='contained'>Submit</Button>
        </Grid>
      </Grid>

      
    </>
  );
}

export default App;