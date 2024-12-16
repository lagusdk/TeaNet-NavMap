import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Roadmap from "../components/Roadmap";
import GenerateHeader from "../components/GenerateHeader";
import "../css/Roadmap.css";

const GenerateRoadmap = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || 1;

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    fetch(`/data${type}.json`)
      .then((response) => response.json())
      .then((data) => {
        setNodes(data.initialNodes);
        setEdges(data.initialEdges);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [type]);

  return (
    <div className="generate-roadmap-container">
      <GenerateHeader type={type} />
      <Roadmap nodes={nodes} edges={edges} />
    </div>
  );
};

export default GenerateRoadmap;
