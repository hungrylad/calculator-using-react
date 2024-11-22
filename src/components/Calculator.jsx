import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleClick = (value) => {
    if (isEvaluated) {
      if (["+", "-", "*", "/", "^", "(", ")"].includes(value)) {
        setInput(result + value);
        setIsEvaluated(false);
      } else {
        setInput(value);
        setResult("");
        setIsEvaluated(false);
      }
    } else {
      const newInput = input + value;
      setInput(newInput);
      updateResult(newInput);
    }
  };

  const updateResult = (expression) => {
    try {
      const formattedExpression = expression.replace("^", "**"); // Replace "^" with JS exponentiation
      const res = eval(formattedExpression);
      setResult(res);
    } catch {
      setResult("");
    }
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const backspace = () => {
    if (input.length > 0) {
      const newInput = input.slice(0, -1);
      setInput(newInput);
      updateResult(newInput);
    }
  };

  const calculate = () => {
    try {
      const formattedExpression = input.replace("^", "**");
      const res = eval(formattedExpression);
      setResult(res);
      setInput(res.toString());
      setIsEvaluated(true);
    } catch {
      setResult("Error");
    }
  };

  const addFunction = (func) => {
    setInput(input + func + "(");
  };

  const addConstant = (constant) => {
    setInput(input + constant);
  };

  // Handle "%" operation
  const handlePercentage = () => {
    try {
      const percentage = parseFloat(input) / 100;
      setInput(percentage.toString());
      setResult(percentage);
    } catch {
      setResult("Error");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        backgroundColor: "#1e1e2f",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#f05454" }}>Scientific Calculator</h1>
      <div
        style={{
          margin: "20px auto",
          width: "400px",
          backgroundColor: "#282c34",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          padding: "20px",
        }}
      >
        <input
          type="text"
          value={input}
          readOnly
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "18px",
            borderRadius: "5px",
            border: "1px solid #444",
            backgroundColor: "#121212",
            color: "#fff",
            marginBottom: "10px",
          }}
        />
        <input
          type="text"
          value={result}
          readOnly
          placeholder="Result"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "18px",
            borderRadius: "5px",
            border: "1px solid #444",
            backgroundColor: "#121212",
            color: result !== "" ? "#00ffab" : "#fff",
            marginBottom: "20px",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
          }}
        >
          {["7", "8", "9", "/", "sin", "4", "5", "6", "*", "cos", "1", "2", "3", "-", "tan", "0", ".", "^", "+", "√", "%"].map(
            (btn) => (
              <button
                key={btn}
                onClick={
                  ["sin", "cos", "tan"].includes(btn)
                    ? () => addFunction(btn)
                    : btn === "√"
                    ? () => addFunction("Math.sqrt")
                    : btn === "^"
                    ? () => handleClick("^")
                    : btn === "%"
                    ? handlePercentage
                    : () => handleClick(btn)
                }
                style={{
                  padding: "15px",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#3a3f58",
                  color: "#c5c6c7",
                  transition: "0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#4c516d")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#3a3f58")}
              >
                {btn}
              </button>
            )
          )}
          <button
            onClick={calculate}
            style={{
              gridColumn: "span 1",
              padding: "15px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#f05454",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff6b6b")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f05454")}
          >
            =
          </button>
          <button
            onClick={backspace}
            style={{
              gridColumn: "span 2",
              padding: "15px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Backspace
          </button>
          <button
            onClick={clearInput}
            style={{
              gridColumn: "span 2",
              padding: "15px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#d62839",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff4e60")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#d62839")}
          >
            Clear
          </button>
          <button
            onClick={() => addConstant("Math.PI")}
            style={{
              gridColumn: "span 1",
              padding: "15px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#ff9800",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
              transition: "0.3s ease",
            }}
          >
            π
          </button>
          <button
            onClick={() => addConstant("Math.E")}
            style={{
              gridColumn: "span 1",
              padding: "15px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#ff9800",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
              transition: "0.3s ease",
            }}
          >
            e
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
