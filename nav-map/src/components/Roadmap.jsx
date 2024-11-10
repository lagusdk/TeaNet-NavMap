import React from "react";
import ReactFlow from "react-flow-renderer";
import "react-flow-renderer/dist/style.css";
import "../css/Roadmap.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "프로그래밍기초" },
    type: "default",
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "이산수학" },
    type: "default",
  },
  {
    id: "3",
    position: { x: 200, y: 100 },
    data: { label: "인공지능과컴퓨팅사고" },
    type: "default",
  },
  {
    id: "4",
    position: { x: 0, y: 200 },
    data: { label: "AI수학" },
    type: "default",
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "3", animated: true },
  { id: "e1-2", source: "2", target: "4", animated: true },
];

const Roadmap = () => {
  return (
    <div className="roadmap-container">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView />
    </div>
  );
};

export default Roadmap;
