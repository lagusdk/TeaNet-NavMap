import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Roadmap from "../components/Roadmap";
import GenerateHeader from "../components/GenerateHeader";
import "../css/Roadmap.css";

const GenerateRoadmap = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || `1`; // 기본값을 1로 설정
  const key = queryParams.get("key") || `key`;

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const link = type === "2" ? `/major_IC.json` : `/career_IC.json`; // type에 따라 JSON 파일 선택

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
  }, [key, type]); // key와 type을 의존성 배열에 추가

  return (
    <div className="generate-roadmap-container">
      <GenerateHeader type={type} /> {/* key를 전달하지 않음 */}
      <Roadmap nodes={nodes} edges={edges} />
    </div>
  );
};

export default GenerateRoadmap;
