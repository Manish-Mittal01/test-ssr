import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import About from "./about";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
