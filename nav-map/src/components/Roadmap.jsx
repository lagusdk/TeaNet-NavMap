import React from "react";
import ReactFlow from "react-flow-renderer";
import "react-flow-renderer/dist/style.css";
import "../css/Roadmap.css";

const Roadmap = ({ nodes, edges }) => {
  return (
    <div className="roadmap-container">
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
};

export default Roadmap;
