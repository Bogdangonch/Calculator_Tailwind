"use strict";

import { showConsoleTable } from "./service.js";

// ? switch theme
document.querySelector("#switch-theme").addEventListener("click", () => {
  document.getElementById("html").classList.toggle("dark");
  switchBtn.classList.toggle("switch-on");
});

let switchBtn = document.querySelector(".switch-btn");
const numberPanel = document.querySelector(".number_panel");
let inputScoreboard = document.querySelector(".input-scoreboard");
let inputResult = document.querySelector(".input-result");
const clean = document.querySelector(".clean");
let plusMinus = document.querySelector(".plus_minus");
let backButton = document.querySelector(".back_button");

let firstNumber = "";
let secondNumber = "";
let sign = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "x", "/", "%", "+/-"];

clean.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  sign = "";
  finish = false;
  inputScoreboard.value = "";
  inputResult.value = "0";
  console.clear();
});

backButton.addEventListener("click", () => {
  let exp = inputScoreboard.value;
  inputScoreboard.value = exp.substring(0, exp.length - 1);
  if (inputResult.value == 0) {
    inputResult.value = "0";
  }
});

numberPanel.addEventListener("click", function (e) {
  // ? contains повертає true, якщо список містить даний маркер інакше повертає false
  if (!e.target.classList.contains("btn-calc")) return;
  if (e.target.classList.contains("clean")) return;

  const key = e.target.dataset.key;

  //? чи натиснуто цифрову нкопку
  if (digit.includes(key)) {
    if (secondNumber === "" && sign === "") {
      inputScoreboard.value += key;
      firstNumber = inputScoreboard.value;
      console.log("firstNumber: ", firstNumber);
    } else if (firstNumber !== "" && secondNumber !== "" && finish) {
      secondNumber = key;
      finish = false;
      inputResult.value = secondNumber;
    } else {
      inputScoreboard.value += key;
      secondNumber += key;
      console.log("secondNumber: ", secondNumber);
    }

    showConsoleTable(firstNumber, secondNumber, sign);
    return;
  }

  // ?  чи натиснуто кнопку знака
  if (action.includes(key)) {
    sign = key;
    //todo
    if (key === "+/-") {
      inputScoreboard.value += "";
      return;
    }
    inputScoreboard.value += key;
    console.log("ENTER ACTION");
    return;
  }

  // ? натиснуто =
  if (key === "=") {
    if (secondNumber === "") secondNumber = firstNumber;

    switch (sign) {
      case "+":
        inputResult.value = +firstNumber + +secondNumber;
        break;
      case "-":
        inputResult.value = +firstNumber - +secondNumber;
        break;
      case "x":
        inputResult.value = +firstNumber * +secondNumber;
        break;
      case "/":
        if (secondNumber === "0") {
          inputResult.value = "Error";
          firstNumber = "";
          secondNumber = "";
          sign = "";
          inputScoreboard.value = "";
          return;
        }
        inputResult.value = +firstNumber / +secondNumber;
        break;
      case "%":
        if (+firstNumber === true && +secondNumber === false) {
          inputResult.value = +firstNumber / 100;
          return;
        } else {
          inputResult.value = (+secondNumber / 100) * +firstNumber;
          return;
        }
        break;
    }
  }
});

// ? +/-
plusMinus.addEventListener("click", () => {
  firstNumber *= -1;
  secondNumber *= -1;
  inputScoreboard.value *= -1;
  inputResult.value *= -1;
});
