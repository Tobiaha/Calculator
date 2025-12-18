"use strict";
const display = document.getElementById("display");

const numButtons = document.querySelectorAll("button.number");
numButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => number(e.target.textContent))
);
const operatorButtons = document.querySelectorAll("button.operator");
operatorButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => operate(e.target.textContent))
);
const decimalButton = document.getElementById("decimalBtn");
decimalButton.addEventListener("click", () => {
  decimalHandler(".");
});

const clearButton = document.getElementById("clearBtn");
clearButton.addEventListener("click", clear);

const deleteButton = document.getElementById("deleteBtn");
deleteButton.addEventListener("click", del);

const equalButton = document.getElementById("equalBtn");
equalButton.addEventListener("click", equals);

// opArray is just a way to see all used operators
let opArray = [];
let firstNum = "";
let lastNum = "";

let total = 0;

let operator = "";

// Since the numbers are strings we convert them for calculation
function calculate() {
  if (!firstNum || !operator || !lastNum) {
    return null;
  }
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
      total = num2 === 0 ? "Error" : num1 / num2;
      break;
    default:
      return null;
  }

  // console.log("total number " + total);

  firstNum = total;
  lastNum = "";
  operator = "";
}

function number(numText) {
  if (!operator) {
    firstNum += numText;
    // console.log("first num turn now " + firstNum);
  } else {
    lastNum += numText;
    // console.log("lastnum turn now " + lastNum);
  }

  display.value += numText;
}

function operate(op) {
  const lastChar = display.value.slice(-1);

  if (!firstNum) {
    return;
  }

  if ("+-*/".includes(lastChar)) return;

  /* logging to array to see operators used
   
  opArray.push(op);
  console.log(opArray); */

  if (firstNum && lastNum) {
    calculate();
    firstNum = total.toString();
    lastNum = "";
    display.value = firstNum;

    // console.log(firstNum + " In operator function");
  }

  operator = op;
  display.value += op;
}

function decimalHandler() {
  const currentNum = operator ? lastNum : firstNum;

  // no double decimals
  if (currentNum.includes(".")) return;

  // have to put a number before decimal
  if (currentNum === "") return;

  if (operator) {
    lastNum += ".";
  } else {
    firstNum += ".";
  }
  display.value += ".";
}

function clear() {
  firstNum = "";
  lastNum = "";
  operator = "";
  total = 0;
  display.value = "";

  // console.log("Allclear");
}

function del() {
  if (!display.value) return;

  const deleteChar = display.value.slice(-1);

  display.value = display.value.slice(0, -1);

  if ("+-*/".includes(deleteChar)) {
    operator = "";
    return;
  }

  if (operator) {
    lastNum = lastNum.slice(0, -1);
  } else {
    firstNum = firstNum.slice(0, -1);
  }
}

function equals() {
  if (firstNum !== "" && operator && lastNum !== "") {
    calculate();
    firstNum = total.toString();
    display.value = total;
    lastNum = "";
    operator = "";
  } else {
    display.value = firstNum;
  }
}

// keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/[0-9]/.test(key)) {
    number(key);
  }

  if (e.key === ".") {
    decimalHandler(".");
  }

  if ("+-*/".includes(key)) {
    operate(key);
  }

  if (e.key === "Enter" || key === "=") {
    e.preventDefault();
    equals();
  }

  if (key === "Backspace") {
    del();
  }

  if (key === "Escape") {
    clear();
  }
});
