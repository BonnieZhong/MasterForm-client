import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';
import './index.css';

const TextFieldComponent = ({ question, multiline, setResponse, index, addQuestion = true }) => {
  const [value, setValue] = useState('');
  const onTextChange = (event) => {
    setValue(event.target.value);
    const response = addQuestion ? {
      question,
      response: event.target.value,
      multiline
    } : {
      index,
      question: event.target.value,
      type: 'textfield',
      multiline: false
    };
    setResponse(response);
  }

  
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      className="text-field-container"
    >
      <p className="text-field-label">{question}</p>
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