import React, { useState, useEffect } from 'react';
import { Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import DropdownComponent from '../../components/DropdownComponent';
import TextFieldComponent from '../../components/TextFieldComponent';
import SelectionListQuestion from '../../components/SelectionListComponent';
import forms from '../../api/forms';
import HeaderComponent from '../../components/HeaderComponent';
import '../../components/App.css';
import './index.css';

const AddExperimentPage = ({ setRefetchData }) => {
  const [questionType, setQuestionType] = useState('');
  const [changedQuestion, setChangedQuestion] = useState({});
  const [newComponents, setNewComponents] = useState([]);
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const onTextChange = (event) => {
    setValue(event.target.value);
  }

  const addTextField = () => {
    return (
        <TextFieldComponent 
          key={count}
          index={count}
          question={`${count+1}. Please enter your question:` }
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
    if(questionType === 'textfield') {
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
      // console.log(questionArr);
      if (isExisted) {
        setQuestions(questionArr);
      } else {
        setQuestions([...questions, changedQuestion]);
      }
    }
  }, [changedQuestion])

  const onSubmit = () => {
    const experiment = [];
    const addQuestions = new Promise((resolve, reject) => {
      questions.forEach(async (item, index, array) => {
        delete item.index;
        const res = await forms.post('/questions', item);
        // console.log(res.data.id);
        experiment.push(res.data.id);
        if (index === array.length - 1) {
          resolve();
        }
      });
    });
    // console.log(questions);
    addQuestions.then(async () => {
      const experimentData = {
        title: value,
        questionIds: experiment
      }
      const res = await forms.post('/experiments', experimentData);
      // console.log(res.data);
      setRefetchData(true);
      navigate('/experiments');
    });
  };

  return (
    <>
    <HeaderComponent showBg={true}/>
    <div className="div-container">
      <h1 className='add-title'>Create your experiment form</h1>
      <div>
        <p className="experiment-form-title">Experiment Form Title:</p>
        <TextField 
          id="textField" 
          variant="outlined" 
          value={value}
          onChange={onTextChange}
          fullWidth 
        />
      </div>
      {newComponents.length > 0 ? newComponents.map(item => {
        return item
      }) : null} 
      <Divider variant="middle" className="add-divider"/>
      <DropdownComponent 
        question="Please select the question type:" 
        options={["textfield", "select"]}
        setResponse={setQuestionType}
        addQuestion={false}
      />
      <div className="div-btn">
        <Button variant="contained" color="success" type="button" onClick={handleAddQuestion}>Add Question</Button>
        <Button variant="contained" color="success" type="submit" onClick={onSubmit} className="add-btn">Submit</Button>
      </div>
      </div>
    </>
  );
};

export default AddExperimentPage;