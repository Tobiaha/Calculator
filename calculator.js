"use strict";
const display = document.getElementById("display");
const numButtons = document.querySelectorAll(".button.number");
const operatorButtons = document.querySelectorAll(
  ".button.operator, .button.decimal"
);
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const equalButton = document.getElementById("equalBtn");

let lastResult = "";

function add(a, b) {
  console.log(a + b);
  return a + b;
}

function subtract(a, b) {
  console.log(a - b);
  return a - b;
}

function multiply(a, b) {
  console.log(a * b);
  return a * b;
}

function divide(a, b) {
  console.log(a / b);
  return a / b;
}
// delete
function del() {
  deleteButton.addEventListener("click", () => {
    display.value = display.value.slice(0, -1);
  });
}
// clear
function clear() {
  clearButton.addEventListener("click", () => {
    display.value = "";
    lastResult = "";
  });
}

// append buttons
function numbers() {
  numButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      display.value += btn.textContent;
    });
  });
}
//append operators
function operators() {
  operatorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      display.value += btn.textContent;
    });
  });
}

// once calculation is complete lastResult should have a new value
function operate() {}
