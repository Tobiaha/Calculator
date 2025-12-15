"use strict";
const display = document.getElementById("display");
const numButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");

const decimalButton = document.getElementById("decimalBtn");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const equalButton = document.getElementById("equalBtn");

let opArray = [];
let firstNum = "";
let lastNum = "";

let total = 0;

let operator = "";

function calculate() {
  const num1 = Number(firstNum);
  const num2 = Number(lastNum);
  switch (operator) {
    case "+":
      total = num1 + num2;
      break;
    case "-":
      total = num1 - num2;
      break;
    case "*":
      total = num1 * num2;
      break;
    case "/":
      total = num1 / num2;
      break;
  }
  console.log("total number " + total);
  firstNum = total;
  lastNum = "";

  operator = "";
}

numButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const numText = e.target.textContent;

    if (!operator) {
      firstNum += numText;
      console.log("first num turn now " + firstNum);
    } else {
      lastNum += numText;
      console.log("lastnum turn now " + lastNum);
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

    if (firstNum && lastNum) {
      calculate();
      firstNum = total.toString();
      lastNum = "";
      display.value = firstNum;

      console.log(firstNum + " In operator function");
    }

    operator = op;
    display.value += op;
  });
});
