import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  About,
  Hero,
  Navbar,
  StarsCanvas,
  ExploreCard,
  Explore,
} from "../components";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
      </div>
      <div className="relative z-o">
        <Hero />
        <StarsCanvas />
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/Log">
          <button className="px-6 py-3 bg-white text-primary font-semibold rounded-full shadow-lg hover:bg-gray-200">
            Get Started
          </button>
        </Link>
      </div>
      <Explore />

      <About />
    </div>
  );
};

export default Home;
