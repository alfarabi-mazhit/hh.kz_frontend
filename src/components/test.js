"use client";
import { useState } from "react";

export default function Test() {
  const [counter, setCounter] = useState(10);
  const plusFunc = () => {
    setCounter(counter + 1);
    console.log("+");
  };
  const minusFunc = () => {
    setCounter(counter - 1);
    console.log("-");
  };
  return (
    <div>
      <h1>My test Component</h1>
      <p>My test paragraph</p>

      <p>Counter: {counter}</p>

      <button onClick={minusFunc}>Minus</button>
      <button onClick={plusFunc}>Plus</button>
    </div>
  );
}
