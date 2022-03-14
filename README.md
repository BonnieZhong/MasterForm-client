# MasterForm App Introduction

The MasterForm App aims to streamline the business process of creating forms for different experiments. With MasterForm App, a user can explore existing experiment forms, create new forms, and change the status of a form.

## Server Side
### Installation

In the API project directory, you can run:
#### `npm install`

Runs this command to install all required modules for a fake REST API.\
The data used by MasterForm will be stored in this json server.\
For more information on this package, please go to this link: https://github.com/typicode/json-server#getting-started

### Run json server

In the API project directory, you can run:
#### `npm start`

Runs the json server.

## Client Side
### Installation
In the MasterForm project directory, you can run:

#### `npm install`

Runs this command to install all required modules listed as dependencies in package.json.

### Run MasterForm

In the MasterForm project directory, you can run:
#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## API

The APIs used in the app:
* GET all experiments: http://localhost:3001/experiments
* GET an experiment: http://localhost:3001/experiments/1
* POST an experiment: http://localhost:3001/experiments
* PATCH an experiment: http://localhost:3001/experiments/1

* GET all questions: http://localhost:3001/questions
* GET a question: http://localhost:3001/questions/1
* POST questions: http://localhost:3001/questions

* POST form data: http://localhost:3001/forms

## Play around with the MasterForm App

### Home Page: 
1. Route:\
http://localhost:3000
2. Description: A welcome page 

### Experiments Page: 
1. Route:\
http://localhost:3000/experiments
2. Description:
* A page shows a list of experiment forms. You can view each experiment form by clicking the "LEARN MORE" button.
* You can give your responses to each experiment form if it is available, and then you can submit it.
* A warning message will show on the page if the experiment form is unavailable.
### Add Experiments Page: 
1. Route:\
http://localhost:3000/add-experiment
2. Description:\
This is a page that allows you to create an experiment form. There are two types of questions you can add: single line questions, and selection questions.
3. Instruction:
* Selects a question type and adds this question field by clicking the "Add Question" button.
* You can enter a list of options for selection questions by clicking the "Add" button.
* Submits your experiment form by clicking the "Submit" button.
* Views your new experiment form on the Experiments Page.
### Admin Page: 
1. Route:\
http://localhost:3000/admin
2. Description:\
A page that lists all your experiments in a table. You can change the form status by clicking the switch button to set your form Available or Not Available.

## Assumptions
* This app **does not perform any validation** on user input.
* This app does not have a responsive UI.
