import React, { useEffect, useState } from "react";
import Roadmap from "../components/Roadmap";
import GenerateHeader from "../components/GenerateHeader";
import "../css/Roadmap.css";

const GenerateRoadmap = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    fetch("/data3.json")
      .then((response) => response.json())
      .then((data) => {
        setNodes(data.initialNodes);
        setEdges(data.initialEdges);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="generate-roadmap-container">
      <GenerateHeader isCareer={3} />
      <Roadmap nodes={nodes} edges={edges} />
    </div>
  );
};

export default GenerateRoadmap;
