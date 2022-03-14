import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import './index.css';

const SelectionListQuestion = ({ index, setQuestion }) => {
  const [options, setOptions] = useState([]);
  const [optionText, setOptionText] = useState('');
  const [questionText, setQuestionText] = useState('');

  const handleAddOptions = () => {
    setOptions([...options, optionText]);
    setOptionText('');
  };

  useEffect(() => {
    let question = {
      index,
      type: 'select',
      question: questionText,
      options
    }
    setQuestion(question);
  }, [options, questionText]);

  return (
    <div>
      <p className="select-text">{`${index+1}. Please enter your question:`}</p>
      <TextField variant="outlined" value={questionText} onChange={(e) => setQuestionText(e.target.value)} fullWidth/>
      <p className="select-text">Please give options to your question:</p>
      <div className="div-option-text">
        {options.length > 0 ? options.map((item, i) => {
          return <span className="option-text" key={i}>{item}</span>;
        }) : null}
      </div>
      <div className="div-option">
        <TextField 
          variant="outlined" 
          value={optionText} 
          onChange={(e) => setOptionText(e.target.value)} 
          className="option-box"
        />
        <Button 
          variant="contained" 
          type="button" 
          color="success"
          onClick={(e) => handleAddOptions(e)}
          className="select-add-btn"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default SelectionListQuestion;