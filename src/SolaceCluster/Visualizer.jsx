import React, { useState, useRef } from "react";
import styled from "styled-components";
import useResizeAware from "react-resize-aware"; // my favorite
import { ForceGraphNode, ForceGraphLink } from "react-vis-force";
import ForceDirectedGraph from "./ForceDirectedGraph";

/**
 * Styles
 */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  line-height: 0;
  overflow: hidden;
  position: relative;
`;

/**
 * Logic
 */

// const HostDetails = ({ hostIp }) => {
//   return (
//     <>{hostIp}</>
//   )
// }

// // hook to help me redraw the graph when size increases
// // otherwise it's staying maximized and pushes out of the screen
// // const forceUpdate = useForceUpdate()
// function useForceUpdate(){
//   const [value, set] = useState(true); //boolean state
//   return () => set(!value); // toggle the state to force render
// }
function formatNodeList(rawNodesList) {
  let nodesList = [];
  for (let node in rawNodesList) {
    nodesList.push(
      <ForceGraphNode
        key={node}
        node={{ id: node, label: rawNodesList[node]['clusterData'][0]["nodeName"], radius: 10}} // can 1 node have > 1 cluster?
        fill="green" // can group by cluster, didn't have a chance to implement
      />
    );
  }
  return nodesList;
}

function formatLinkList(rawLinksList) {
  let linksList = [];
  for (let link in rawLinksList) {
    const connectedNodes = link.split(",");
    linksList.push(
      <ForceGraphLink
        key={link}
        link={{ source: connectedNodes[0], target: connectedNodes[1], value: 10}} // value function goes here
      />
    );
  }
  return linksList;
}

function ClusterDiagram({ nodes, links, selectedNode, onSelectNode }) {
  const [resizeListener, sizes] = useResizeAware();

  let content;
  if (nodes.length > 0) {
    content = (
      <ForceDirectedGraph
        height={sizes.height}
        width={sizes.width}
        nodes={nodes}
        links={links}
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
      />
    );
  } else {
    content = (
      <div style={{ "margin-top": "15px" }}>
        Get started by searching for a mesh
      </div>
    );
  }
  return (
    <Container>
      {resizeListener}
      {sizes.height ? content : <></>}
    </Container>
  );
}

function Visualizer({ nodes, links, selectedNode, onSelectNode }) {
  const [view, setView] = useState("details"); // details OR diagram

  return (
    <Content>
      <ClusterDiagram
        nodes={formatNodeList(nodes)}
        links={formatLinkList(links)}
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
      />
    </Content>
  );
}

export default Visualizer;
