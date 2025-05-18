document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
  
    let current = "0";
    let previous = "";
    let operator = "";
  
    function updateDisplay() {
      display.textContent = current;
    }
  
    function clearCalc() {
      current = "0";
      previous = "";
      operator = "";
      updateDisplay();
    }
  
    function appendNumber(num) {
      if (current === "0" && num !== ".") {
        current = num;
      } else if (num === "." && current.includes(".")) {
        return;
      } else {
        current += num;
      }
      updateDisplay();
    }
  
    function chooseOperator(op) {
      if (current === "") return;
      if (previous !== "") {
        calculate();
      }
      operator = op;
      previous = current;
      current = "";
    }
  
    function calculate() {
      const prev = parseFloat(previous);
      const curr = parseFloat(current);
      if (isNaN(prev) || isNaN(curr)) return;
  
      let result = 0;
      switch (operator) {
        case "+":
          result = prev + curr;
          break;
        case "-":
          result = prev - curr;
          break;
        case "*":
          result = prev * curr;
          break;
        case "/":
          result = curr === 0 ? "Error" : prev / curr;
          break;
        default:
          return;
      }
  
      current = result.toString();
      operator = "";
      previous = "";
      updateDisplay();
    }
  
    function toggleSign() {
      if (current !== "0") {
        current = (parseFloat(current) * -1).toString();
        updateDisplay();
      }
    }
  
    function percent() {
      current = (parseFloat(current) / 100).toString();
      updateDisplay();
    }
  
    document.querySelectorAll(".btn").forEach((btn) => {
      const action = btn.dataset.action;
      const value = btn.dataset.value;
  
      btn.addEventListener("click", () => {
        switch (action) {
          case "number":
            appendNumber(value);
            break;
          case "clear":
            clearCalc();
            break;
          case "plus-minus":
            toggleSign();
            break;
          case "percent":
            percent();
            break;
          case "operator":
            chooseOperator(value);
            break;
          case "equals":
            calculate();
            break;
        }
      });
    });
  
    updateDisplay();
  });
  