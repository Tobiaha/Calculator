"use strict";
const display = document.getElementById("display");
const numButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");

const decimalButton = document.getElementById("decimalBtn");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const equalButton = document.getElementById("equalBtn");

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
    const op = e.target.textContent;
    const lastChar = display.value.slice(-1);

    if (!firstNum) {
      return;
    }

    if ("+-*/".includes(lastChar)) return;

    // logging to array to see operators
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

decimalButton.addEventListener("click", (e) => {
  const decimal = e.target.textContent;
  let currentNum = operator ? lastNum : firstNum;
  if (decimal === "." && currentNum.includes(".")) return;

  if (decimal === "." && currentNum === "") return;

  if (operator) {
    lastNum += decimal;
    display.value += ".";
  } else {
    firstNum += decimal;
    display.value += ".";
  }
});

clearButton.addEventListener("click", () => {
  firstNum = "";
  lastNum = "";
  operator = "";
  total = 0;
  display.value = "";
  console.log("Allclear");
});

deleteButton.addEventListener("click", () => {
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
});

equalButton.addEventListener("click", () => {
  if (firstNum !== "" && lastNum !== "") {
    calculate();
    firstNum = total.toString();
    display.value = total;
    lastNum = "";
    operator = "";
  } else {
    display.value = firstNum;
  }
});
