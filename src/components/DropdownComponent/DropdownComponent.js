import React from 'react';
import { FormControl, Grid, MenuItem, Select } from '@mui/material';

const DropdownComponent = ({ question, options }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      className='container-box2'
    >
      <p className='label-text'>{question}</p>
      <FormControl fullWidth>
        <Select 
          id="singleSelect"
          value={options[0]}
        > 
          { options.map((option, index) => (
            <MenuItem  key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default DropdownComponent;