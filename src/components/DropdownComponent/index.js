import React, { useState } from 'react';
import { FormControl, Grid, MenuItem, Select } from '@mui/material';

const DropdownComponent = ({ question, options, setResponse, addQuestion = true }) => {
  const [value, setValue] = useState("placeholder");
  const onChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    const response = addQuestion ? {
      "question": question,
      "response": event.target.value
    } : event.target.value;
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
      <p className="label-text">{question}</p>
      <FormControl fullWidth>
        <Select 
          id="singleSelect"
          value={value}
          onChange={onChange}
        > 
          <MenuItem value="placeholder" disabled><em>Choose an option</em></MenuItem>
          { options.map((option, index) => (
            <MenuItem  key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default DropdownComponent;