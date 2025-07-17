// src/App.js
import React from "react";
import Home from "./pages/Home";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function App() {
  // console.log(API_KEY);
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
