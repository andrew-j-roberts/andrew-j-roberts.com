import React from "react";
import { InteractiveForceGraph } from "react-vis-force";

function ForceDirectedGraph({
  height,
  width,
  nodes,
  links,
  selectedNode,
  onSelectNode
}) {
  return (
    <InteractiveForceGraph
      highlightDependencies
      simulationOptions={{ height: height, width: width }}
      selectedNode={selectedNode}
      onSelectNode={(event, node) => onSelectNode(node)}
      onDeselectNode={(event, node) => {
        onSelectNode(null);
      }}
      labelAttr="label"
    >
      {nodes.map((item, i) => {
        return item;
      })}
      {links.map((item, i) => {
        return item;
      })}
    </InteractiveForceGraph>
  );
}

export default ForceDirectedGraph;
