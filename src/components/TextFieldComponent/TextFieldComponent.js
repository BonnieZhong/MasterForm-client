import React from 'react';
import { TextField, Grid } from '@mui/material';
import "./TextFieldComponent.css";

const TextFieldComponent = ({ question, multiline }) => {
  // const { questionText, multiline } = 
  console.log(question, multiline);
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
        <TextField id="textField" variant="outlined" fullWidth multiline rows={3}/>
      ) : (
        <TextField id="textField" variant="standard" fullWidth/>
      )}
      
    </Grid>
   
  );
};

export default TextFieldComponent;