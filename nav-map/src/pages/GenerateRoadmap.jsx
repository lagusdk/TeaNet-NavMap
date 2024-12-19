import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Roadmap from "../components/Roadmap";
import GenerateHeader from "../components/GenerateHeader";
import "../css/Roadmap.css";

const GenerateRoadmap = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const key = queryParams.get("key") || `key`;

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const getlink = () => {
    switch (key) {
      case "Data Science":
        return "major_IC.json";
      case "Visual Technology":
        return "major_IC.json";
      default:
        return "career_IC.json";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const link = getlink();

      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const skillTree = data.skillTrees.find((tree) => tree.key === key);
        if (skillTree) {
          setNodes(skillTree.value.initialNodes);
          setEdges(skillTree.value.initialEdges);
        } else {
          console.error("No matching skill tree found for the key:", key);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [key]);

  return (
    <div className="generate-roadmap-container">
      <GenerateHeader />
      <Roadmap nodes={nodes} edges={edges} />
    </div>
  );
};

export default GenerateRoadmap;
