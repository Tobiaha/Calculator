"use strict";
const display = document.getElementById("display");
const numButtons = document.querySelectorAll(".button.number");
const operatorButtons = document.querySelectorAll(
  ".button.operator, .button.decimal"
);

const decimalButton = document.getElementById("decimalBtn");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const equalButton = document.getElementById("equalBtn");

let lastNumber = "";
let operator = "";
let total = 0;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const divide = (a, b) => a / b;

const multiply = (a, b) => a * b;

function calculate() {
  const num = parseFloat(lastNumber);
  if (!isNaN(num)) {
    if (operator) {
      switch (operator) {
        case "+":
          total += num;
          break;
        case "-":
          total -= num;
          break;
        case "*":
          total *= num;
          break;
        case "/":
          total /= num;
          break;
      }
    } else {
      total = num;
    }
  }
}

//numbers
numButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const storedNum = btn.textContent.trim();

    lastNumber += storedNum;
    total += storedNum;
    display.value += storedNum;
  });
});

//decimals
decimalButton.addEventListener("click", () => {
  const currentNumber = lastNumber;
  if (!currentNumber.includes(".")) {
    display.value += ".";
  }
});

//operators
operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const op = btn.textContent.trim();
    const lastChar = display.value.slice(-1);

    if (!operator) return;

    if ("+-*/".includes(lastChar)) return;

    calculate();

    operator = op; // store the new operator
    lastNumber = ""; // reset number being typed

    display.value += op;
  });
});

//equal operation
equalButton.addEventListener("click", () => {
  calculate();

  display.value = total;
  total = savedTotal.toString();

  lastNumber = "";
  operator = "";
});

// clear
clearButton.addEventListener("click", () => {
  lastNumber = "";
  operator = "";
  display.value = "";
  total = 0;
});

//backspace
deleteButton.addEventListener("click", () => {});
