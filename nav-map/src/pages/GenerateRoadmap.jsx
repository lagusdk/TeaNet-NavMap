import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Roadmap from "../components/Roadmap";
import GenerateHeader from "../components/GenerateHeader";
import "../css/Roadmap.css";

const Modal = ({ nodeData, onClose }) => {
  if (!nodeData) return null;

  return (
    <div className="modal">
      <h2>{nodeData.label}</h2>
      <p>강의 코드: {nodeData.course_code}</p>
      <p>학기: {nodeData.semester}</p>
      <p>학점: {nodeData.credits}</p>
      <p>강의 유형: {nodeData.course_type}</p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

const GenerateRoadmap = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const key = queryParams.get("key") || `key`;

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const getlink = () => {
    switch (key) {
      case "Data Science":
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

  const onNodeClick = (event, node) => {
    setSelectedNode(node.data); // 클릭한 노드의 데이터를 상태에 저장
  };

  return (
    <div className="generate-roadmap-container">
      <GenerateHeader />
      <Roadmap nodes={nodes} edges={edges} onNodeClick={onNodeClick} />
      <Modal nodeData={selectedNode} onClose={() => setSelectedNode(null)} />
    </div>
  );
};

export default GenerateRoadmap;
