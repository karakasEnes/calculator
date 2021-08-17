const inputBtns = document.querySelectorAll("button");
const calculatorDisplay = document.querySelector("h1");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingSecondValue = false;

function sendNumberValue(number) {
  if (awaitingSecondValue) {
    calculatorDisplay.textContent = number;
    awaitingSecondValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingSecondValue) {
    return;
  }
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

const calculator = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function operatorSetup(operator) {
  // prevent multiple operator
  if (operatorValue && awaitingSecondValue) {
    operatorValue = operator;
    return;
  }

  if (!firstValue) {
    firstValue = Number(calculatorDisplay.textContent);
  } else {
    currentValue = Number(calculatorDisplay.textContent);
    console.log(firstValue, operatorValue, currentValue);
    const calculation = calculator[operatorValue](firstValue, currentValue);
    console.log("conclution: ", calculation);
    firstValue = calculation;
  }
  awaitingSecondValue = true;
  operatorValue = operator;
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => operatorSetup(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

function resetAll() {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awaitingSecondValue = false;
}

clearBtn.addEventListener("click", () => resetAll());
