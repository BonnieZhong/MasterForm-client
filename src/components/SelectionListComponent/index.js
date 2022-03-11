import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

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
      type: "select",
      question: questionText,
      options
    }
    setQuestion(question);
  }, [options, questionText]);

  return (
    <div style={{marginLeft: '10px'}}>
      <h3>Please enter your question:</h3>
      <TextField variant="outlined" value={questionText} onChange={(e) => setQuestionText(e.target.value)}/>
      <h3>Please give options to your question:</h3>
      {options.length > 0 ? options.map((item, i) => {
        return <div key={i}>{item}</div>;
      }) : null}
      <TextField variant="outlined" value={optionText} onChange={(e) => setOptionText(e.target.value)} />
      <Button variant='contained' type='button' onClick={(e) => handleAddOptions(e)}>Add</Button>
    </div>
  );
};

export default SelectionListQuestion;