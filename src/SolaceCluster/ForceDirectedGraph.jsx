import React from 'react';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';

const ForceDirectedGraph = ({ height, width, nodes, list }) => {
  console.log("FDG:", height, width)
  return (
      <InteractiveForceGraph
        simulationOptions={{ height: height, width: width }}
        labelAttr="label"
        onSelectNode={(node) => console.log(node)}
        highlightDependencies
      >
        <ForceGraphNode node={{ id: 'first-node', label: 'First node' }} fill="red" />
        <ForceGraphNode node={{ id: 'second-node', label: 'Second node' }} fill="blue" />
        <ForceGraphLink link={{ source: 'first-node', target: 'second-node' }} />
      </InteractiveForceGraph>
  )
}

export default ForceDirectedGraph