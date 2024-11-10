import React from "react";
import Roadmap from "./Roadmap";
import GenerateHeader from "../components/GenerateHeader";
import "../css/Roadmap.css";

const GenerateRoadmap = () => {
  return (
    <div className="generate-roadmap-container">
      <GenerateHeader />
      <Roadmap />
    </div>
  );
};

export default GenerateRoadmap;
