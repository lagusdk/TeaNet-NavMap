import React from "react";
import ReactFlow from "react-flow-renderer";
import "react-flow-renderer/dist/style.css";
import "../css/Roadmap.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    type: "default",
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "Node 2" },
    type: "default",
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

const Roadmap = () => {
  return (
    <div className="roadmap-container">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView />
    </div>
  );
};

export default Roadmap;
