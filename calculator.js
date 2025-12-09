"use strict";
const display = document.getElementById("display");
const numButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");

const decimalButton = document.getElementById("decimalBtn");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const equalButton = document.getElementById("equalBtn");

let opArray = [];
let firstNumber = "";
let lastNumber = "";
let lastNumTurn = false;

let operator = "";

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const divide = (a, b) => a / b;

const multiply = (a, b) => a * b;

function calculate(firstNumber, lastNumber) {
  let total = 0;
  const firstNum = parseFloat(firstNumber);
  const lastNum = parseFloat(lastNumber);

  switch (operator) {
    case "+":
      total = firstNum + lastNum;
      break;
    case "-":
      total = firstNum - lastNum;
      break;
    case "*":
      total = firstNum * lastNum;
      break;
    case "/":
      total = firstNum / lastNum;
      break;
  }
  console.log(total);
  firstNum = total.toString();
  lastNum = "";
  operator = "";
  lastNumTurn = false; // ready to type new number
}

numButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const numText = e.target.textContent;
    if (!lastNumTurn && !operator) {
      firstNumber += numText;

      console.log("first num turn now");
    } else if (!operator && lastNumTurn) {
      lastNumber += numText;
      console.log("lastnumturn now");
    }

    display.value += numText;
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let operators = ["+", "-", "*", "/"];
    let op = e.target.textContent;
    const lastChar = display.value.slice(-1);

    if (operators.includes(lastChar)) {
      return;
    }

    opArray.push(op);
    console.log(opArray);

    if (operator && lastNumTurn) {
      firstNumber = display.value; // Everything before operator

      console.log(firstNumber + " In operator function");
    } else {
      lastNumber = display.value.slice(firstNumber.length + 1);
      calculate(firstNumber, lastNumber);
      firstNumber = total;
    }
    operator = op;
    display.value += op;
  });
});
