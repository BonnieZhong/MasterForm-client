import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';
import "./TextFieldComponent.css";

const TextFieldComponent = ({ question, multiline, setResponse, index, addQuestion = true }) => {
  const [value, setValue] = useState("");
  // const [response, setResponse] = useState({});
  const onTextChange = (event) => {
    setValue(event.target.value);
    const response = addQuestion ? {
      question,
      response: event.target.value,
      multiline
    } : {
      index,
      question: event.target.value,
      type: "textfield",
      multiline: false
    };
    // console.log(response);
    setResponse(response);
  }

  
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      className='container-box2'
    >
      <p className='label-text'>{question}</p>
      { multiline ? (
        <TextField 
          id="textField" 
          variant="outlined" 
          value={value}
          onChange={onTextChange}
          fullWidth 
          multiline 
          rows={3}

        />
      ) : (
        <TextField 
          id="textField" 
          variant="standard"
          value={value}
          onChange={onTextChange} 
          fullWidth
        />
      )}
      
    </Grid>
   
  );
};

export default TextFieldComponent;