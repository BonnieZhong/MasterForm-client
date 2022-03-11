import React, { useState, useEffect } from 'react';
import { Button, IconButton, TextField } from '@mui/material';

import DropdownComponent from '../components/DropdownComponent/DropdownComponent';
import TextFieldComponent from '../components/TextFieldComponent/TextFieldComponent';
import SelectionListQuestion from '../components/SelectionListComponent';
import forms from '../api/forms';

const AddExperimentPage = () => {
  const [questionType, setQuestionType] = useState('');
  const [changedQuestion, setChangedQuestion] = useState({});
  const [newComponents, setNewComponents] = useState([]);
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([]);
 
  const addTextField = () => {
    return (
    <TextFieldComponent 
      key={count}
      index={count}
      question="Please enter your question:" 
      multiline
      setResponse={setChangedQuestion}
      addQuestion={false}
    />
    );
  };

  const addSelectField = () => {
    return <SelectionListQuestion key={count} index={count} setQuestion={setChangedQuestion}/>
  };

  // Handle adding question UI
  const handleAddQuestion = (event) => {
    // console.log(questionType);
    if(questionType === "textfield") {
      setNewComponents([...newComponents, addTextField()]);
    }else{
      setNewComponents([...newComponents, addSelectField()]);
    }
    setCount(count + 1);
  };

  // Handle an existing question update or add a new question
  useEffect(() => {
    let isExisted = false;
    if (Object.keys(changedQuestion).length !== 0) {
      const questionArr = questions.map(item => {
        if (item.index === changedQuestion.index) {
          isExisted = true;
          return changedQuestion;
        }
        return item;
      });
  
      if (isExisted) {
        setQuestions(questionArr);
      } else {
        setQuestions([...questions, changedQuestion]);
      }
    }
  }, [changedQuestion])
 
  // console.log(questions);

  const onSubmit = () => {
    const experiment = [];
    const addQuestions = new Promise((resolve, reject) => {
      questions.forEach(async (item, index, array) => {
        delete item.index;
        const res = await forms.post('/questions', item);
        console.log(res.data.id);
        experiment.push(res.data.id);
        if (index === array.length - 1) {
          resolve();
        }
      });
    });
    console.log(questions);
    addQuestions.then(async () => {
      const experimentData = {
        title: "testing",
        questionIds: experiment
      }
      const res = await forms.post('/experiment', experimentData);
      console.log(res.data);
    });
  };

  return (
    <>
    {newComponents.length > 0 ? newComponents.map(item => {
      return item
    }) : null} 
    <DropdownComponent 
      question="Please select the question type:" 
      options={["textfield", "select"]}
      setResponse={setQuestionType}
      addQuestion={false}
    />
    <Button variant='contained' type='button' onClick={handleAddQuestion}>Add</Button>
    <Button variant='contained' type='submit' onClick={onSubmit}>Submit</Button>
    </>
  );
};

export default AddExperimentPage;