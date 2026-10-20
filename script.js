let currentInput = "";
let previousInput = "";
let operator = "";
let justCalculated = false;

const display = document.getElementById("display");
const keys = document.getElementById("keys");

function updateDisplay() {
  const expression = `${previousInput} ${operator} ${currentInput}`.trim();
  display.textContent = expression || "0";
}

function clearAll() {
  currentInput = "";
  previousInput = "";
  operator = "";
  justCalculated = false;
  updateDisplay();
}

function appendDigit(value) {
  if (justCalculated) {
    currentInput = "";
    justCalculated = false;
  }
  if (value === "." && currentInput.includes(".")) return; // no double dots
  if (value === "." && currentInput === "") currentInput = "0"; // ".5" becomes "0.5"
  if (value === "0" && currentInput === "0") return; // no "000"
  if (currentInput === "0" && value !== ".") currentInput = ""; // "05" becomes "5"
  currentInput += value;
  updateDisplay();
}

function chooseOperator(op) {
  if (currentInput === "" && previousInput === "") return; 
  if (currentInput === "") {
    operator = op; 
    return;
  }
  if (previousInput !== "" && operator !== "") calculate(); 
  if (currentInput === "") return; 
  previousInput = currentInput;
  currentInput = "";
  operator = op;
  justCalculated = false;
  updateDisplay();
}

function calculate() {
  if (currentInput === "" || previousInput === "" || operator === "") return;
  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  let result;
    switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        clearAll();
        display.textContent = "Cannot divide by 0";
        return;
      }
      result = a / b;
      break;
  }
  // toFixed + parseFloat cleans 0.1 + 0.2 = 0.30000000000000004 into 0.3
  currentInput = String(parseFloat(result.toFixed(10)));
  previousInput = "";
  operator = "";
  justCalculated = true;
  updateDisplay();
}


keys.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  const { value, action } = button.dataset;

  switch (action) {
    case "digit":
      appendDigit(value);
      break;
    case "operator":
      chooseOperator(value);
      break;
    case "equals":
      calculate();
      break;
    case "clear":
      clearAll();
      break;
  }
});
updateDisplay();