import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  X,
  UpArrow,
  MagnifyingGlass,
  NetworkGraphIcon,
  Terminal,
  ClearList
} from "../UI/Icons";
import { Flex } from "../UI/Flex";

import NodeList from "./NodeList";
import Visualizer from "./Visualizer";
import Logger from "./Logger";
import { useLogger } from "../Hooks/logger-hook";
import { FindMeshForm, RunCommandsForm } from "./Forms";
import { SEMP, discoverMesh } from "./Api/SEMP";
import { TopicPublisher, TopicSubscriber } from "./Api/SolaceClient";

/**
 * Styling
 */

const Page = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: ${props =>
    props.sidebarOpen ? "500px 1fr" : "45px 1fr"};
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${props =>
    props.sidebarOpen ? "calc(100vw - 500px)" : "calc(100vw - 45px)"};
  max-height: calc(100vh - 71px);
`;

const Footer = styled.div`
  height: ${props => (props.open ? "200px" : "auto")};
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FooterButton = styled.div`
  cursor: pointer;
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const FooterHeader = styled(Flex)`
  align-items: center;
`;

const FooterIconBar = styled(Flex)`
  align-items: center;
`;

const ActivityBar = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityBarButton = styled.div`
  cursor: pointer;
  height: 35px;
  width: 35px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 5px;

  & :hover {
    background-color: #dee2e6;
  }
`;

const Sidebar = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.sidebarOpen ? "45px 1fr" : "45px 0px"};
`;

const SidebarHeader = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`;

const SidebarPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px 10px 10px;
`;

const TabBar = styled.div`
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  height: 50px;
`;

const Tab = styled(Link)`
  cursor: pointer;
  border: none;
  height: 30px;
  outline: none;
  padding: 10px;
  transition: 0.3s;
  text-decoration: none;
  color: #000000;
  align-items: baseline;
  justify-content: center;
  display: flex;

  & :hover {
    color: #0000ee;
    background-color: #dee2e6;
  }
`;

const TabX = styled.div`
  cursor: pointer;
  padding: 0px 0px 0px 10px;
`;

/**
 * Logic
 */

const isSelected = (currentSelection, selection) => {
  return currentSelection === selection;
};

const formatNodeList = nodes => {
  let nodeList = [];
  for (let node in nodes) {
    let formattedNode = {
      ip: node,
      name: nodes[node]['name']
    };
    nodeList.push(formattedNode);
  }
  return nodeList;
};

function SolaceClusterPage() {
  // UI
  const [footerOpen, setFooterOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarSelection, setSidebarSelection] = useState("search"); // search, nodes [future: settings]
  // logic
  const [sempClient, setSempClient] = useState(null);
  const [defaultIpAddress, setDefaultIpAddress] = useState("");
  const [defaultUsername, setDefaultUsername] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");
  const [currentNode, setCurrentNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  // logger
  const { logs, log, clearLogs } = useLogger([]);

  // sidebar navigation
  let sidebarPanel;
  if (sidebarSelection === "search") {
    sidebarPanel = (
      <>
        <SidebarHeader>
          <div>Find a Mesh</div>
        </SidebarHeader>
        <FindMeshForm
          defaultIpAddress={defaultIpAddress}
          defaultUsername={defaultUsername}
          defaultPassword={defaultPassword}
          submitHandler={async (ipAddress, username, password) => {
            const client = new SEMP(username, password);
            setSempClient(client);
            setDefaultIpAddress(ipAddress);
            setDefaultUsername(username);
            setDefaultPassword(password);
            const res = await discoverMesh(client, ipAddress, {}, {});
            if (!(res instanceof Error)) {
              if (Object.keys(res["nodes"]).length > 0) {
                setNodes(res["nodes"]);
                setLinks(res["links"]);
                console.log(
                  "For demo purposes, this is what is being returned by discoverMesh:",
                  res["nodes"],
                  res["links"]
                );
                log(`Discovered mesh using IP address ${ipAddress}`);
              } else {
                log(`Error discovering mesh using ip "${ipAddress}"`);
              }
            } else {
              log(`Error discovering mesh using ip "${ipAddress}"`);
            }
          }}
        />
      </>
    );
  } else if (sidebarSelection === "nodes") {
    sidebarPanel = (
      <>
        <SidebarHeader>Nodes Explorer</SidebarHeader>
        <NodeList currentNode={currentNode} onRowClick={setCurrentNode} list={formatNodeList(nodes)} />
      </>
    );
  } else if (sidebarSelection === "commands") {
    sidebarPanel = (
      <>
        <SidebarHeader>Run Commands</SidebarHeader>
        <RunCommandsForm
          defaultUsername={defaultUsername}
          defaultPassword={defaultPassword}
          connectPublishers={async (username, password) => {
            if (Object.keys(nodes).length > 0) {
              let updatedNodes = nodes;
              for (let key in nodes) {
                const topicPublisher = TopicPublisher(log);
                updatedNodes[key]['publisherClient'] = topicPublisher;
                topicPublisher.run(
                  `http://${nodes[key].ip}`,
                  "default", // can update to be dynamic
                  username,
                  password
                );
              }
              console.log(updatedNodes);
              setNodes(updatedNodes);
            } else {
              alert("No nodes ready to connect.");
            }
          }}
          publishMessages={async (topic, message) => {
            if (Object.keys(nodes).length > 0) {
              for (let key in nodes) {
                if(nodes[key]['publisherClient']) {
                  nodes[key]['publisherClient'].publish(topic, message);
                } else {
                  log(`Cannot publish message because there is no publisher client set for node ${nodes[key]['ip']}`)
                }
              }
            } else {
              alert("No nodes available.");
            }
          }}
          connectSubscribers={async (username, password) => {
            console.log(username, password);
            if (Object.keys(nodes).length > 0) {
              for (let key in nodes) {
                const topicSubscriber = TopicSubscriber("test", log);
                topicSubscriber.run(
                  `http://${nodes[key].ip}`,
                  "default", // can update to be dynamic
                  username,
                  password
                );
              }
            } else {
              alert("No nodes ready to connect.");
            }
          }}
          subscribeToTopic={async topic => {
            console.log(topic);
          }}
        />
      </>
    );
  }

  return (
    <Page sidebarOpen={sidebarOpen}>
      <Sidebar sidebarOpen={sidebarOpen}>
        <ActivityBar>
          <ActivityBarButton
            onClick={
              isSelected(sidebarSelection, "search")
                ? () => {
                    setSidebarSelection(null);
                    setSidebarOpen(false);
                  } // already opened, so close it
                : () => {
                    setSidebarSelection("search");
                    setSidebarOpen(true);
                  }
            }
          >
            <MagnifyingGlass height={"28px"} width={"28px"} />
          </ActivityBarButton>
          <ActivityBarButton
            onClick={
              isSelected(sidebarSelection, "nodes")
                ? () => {
                    setSidebarSelection(null);
                    setSidebarOpen(false);
                  } // already opened, so close it
                : () => {
                    setSidebarSelection("nodes");
                    setSidebarOpen(true);
                  }
            }
          >
            <NetworkGraphIcon height={"28px"} width={"28px"} />
          </ActivityBarButton>
          <ActivityBarButton
            onClick={
              isSelected(sidebarSelection, "commands")
                ? () => {
                    setSidebarSelection(null);
                    setSidebarOpen(false);
                  } // already opened, so close it
                : () => {
                    setSidebarSelection("commands");
                    setSidebarOpen(true);
                  }
            }
          >
            <Terminal height={"28px"} width={"28px"} />
          </ActivityBarButton>
        </ActivityBar>
        <SidebarPanel>{sidebarPanel}</SidebarPanel>
      </Sidebar>
      <Main footerOpen={footerOpen} sidebarOpen={sidebarOpen}>
        <TabBar>
          <Tab to="/solace-cluster/diagram">Diagram</Tab>
        </TabBar>
        <Visualizer
          nodes={nodes}
          links={links}
          selectedNode={currentNode}
          onSelectNode={setCurrentNode}
        />
        <Footer open={footerOpen}>
          <FooterHeader
            justifyBetween
            padding={"5px 10px 5px 0px"}
            width={"100%"}
          >
            <div>Event log</div>
            <FooterIconBar>
              <FooterButton onClick={() => clearLogs()}>
                {footerOpen ? <ClearList height={15} width={15} /> : <></>}
              </FooterButton>
              <FooterButton onClick={() => setFooterOpen(!footerOpen)}>
                {footerOpen ? (
                  <X height={15} width={15} />
                ) : (
                  <UpArrow height={25} width={25} />
                )}
              </FooterButton>
            </FooterIconBar>
          </FooterHeader>
          <Logger logList={logs} />
        </Footer>
      </Main>
    </Page>
  );
}

export default SolaceClusterPage;
