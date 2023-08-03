import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EarthCanvas } from "../components/canvas";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import "./log.css";
import { StarsCanvas } from "../components/canvas";

import { Login, Register } from "../components";

const Log = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <body className="backg awesome ">
      <StarsCanvas />
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </body>
  );
};

export default Log;
