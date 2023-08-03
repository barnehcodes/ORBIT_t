import React, { useState } from "react";
import Upload from "../components/Upload";
import Navbar2 from "../components/Navbar2";
import Datatable from "../components/Datatable";
import "./palace.css";
import { StarsCanvas } from "../components/canvas";

const Palace = () => {
  return (
    <div className="background awesomeBG">
      <StarsCanvas />
      <div className="container">
        <Navbar2 className="navbar" />

        <div className="upload">
          <Upload />
        </div>
        <div className="datatable">
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default Palace;
