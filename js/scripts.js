let expression = '';

// Functions
const evaluateExpression = (str) => {
  let answer = Function(`'use strict'; return (${str})`)();
  if (answer === Infinity) return 'ERROR';

  return Math.round(answer * 100) / 100;
}

const displayValue = (e) => {
  display.value = expression;

  if (e.target.className === 'num__key') {
    expression += e.target.textContent;
    display.value += e.target.textContent;
    console.log(expression);
    console.log(typeof expression);
  }

  if (e.target.className === 'operator__key') {
    if (!previousCharOperator(expression) && expression !== '') {
      expression += e.target.textContent;
      display.value += e.target.textContent;
      console.log(expression);
      console.log(typeof expression);
    }
  } 

  if (e.target.className === 'equal__key') {
    if (expression !== '') {
      // Check if expression ends with an operator
      if (previousCharOperator(expression)) {
        display.value = 'INVALID';
        expression = '';
      } else {
        display.value = evaluateExpression(expression);
        console.log(evaluateExpression(expression));
        console.log(typeof evaluateExpression(expression));
        expression = '';
      }
    }
  }
}

const previousCharOperator = (expression) => {
  let operators = ['+', '-', '*', '/', '.'];

  return operators.includes(expression[expression.length - 1]);
}

const clearAll = (e) => {
  expression = '';
  display.value = '';
}

// Selectors
let num_keys = document.querySelectorAll('.num__key');
let operator_keys = document.querySelectorAll('.operator__key');
let clear_key = document.querySelector('.clear__key');
let equal_key = document.querySelector('.equal__key');
let display = document.getElementById('display');

// Event Listeners
num_keys.forEach((num_key) => {
  num_key.addEventListener('click', displayValue);
});

operator_keys.forEach((operator__key) => {
  operator__key.addEventListener('click', displayValue);
});

equal_key.addEventListener('click', displayValue);
clear_key.addEventListener('click', clearAll);

