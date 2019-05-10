import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Grid, AutoSizer } from "react-virtualized";
import SolaceSvg from "../UI/Logos/PubSubLogo";
import { PlusSign, MinusSign, Circle } from "../UI/Icons";

/**
 * Styling
 */

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ButtonCell = styled.div`
  cursor: pointer;
  height: 20px;
  width: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Cell = styled.div`
  background-color: ${props =>
    props.rowIndex % 2 === 0 ? "#FFFFFF" : "#fafafa"};
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;

const GridHeader = styled.div`
  display: grid;
  grid-template-columns: 30px 125px 140px 80px 80px;
  font-size: 0.8em;
  font-weight: bolder;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 5px;
`


/**
 * Logic
 */

const columnMap = ["button","name", "ip", "publisherStatus", "subscriberStatus"];

function NodeList({ list, currentNode, onRowClick }) {
  const GridRef = useRef(null);
  // other examples modified datum.expanded, immutable data & keeping track of state = better
  const [expandedMap, setExpandedMap] = useState({});

  function cellRenderer(columnIndex, key, rowIndex, style) {
    let content;
    switch (columnIndex) {
      case 0:
        if (expandedMap[rowIndex]) {
          content = (
            <Flex 
              key={key}   
              rowIndex={rowIndex} 
              onClick={() => {
                // de-highlight node in graph
                onRowClick()
                // handle collapsing the row here - didn't get to finish
                let updatedExpandedMap = expandedMap;
                updatedExpandedMap[rowIndex] = false;
                setExpandedMap(updatedExpandedMap);
                GridRef.current.forceUpdate();
              }}
            >
              <ButtonCell>
                <MinusSign width={15} height={15} />
              </ButtonCell>
            </Flex>
          );
        } else {
          content = (
            <Flex 
              key={key}   
              rowIndex={rowIndex} 
              onClick={() =>{
                // highlight node in graph
                onRowClick({
                  id: list[rowIndex]["ip"],
                  label: list[rowIndex]["name"]
                })
                // expand row to show link info - didn't get here
                let updatedExpandedMap = expandedMap;
                updatedExpandedMap[rowIndex] = true;
                console.log(updatedExpandedMap);
                setExpandedMap(updatedExpandedMap);
                GridRef.current.forceUpdate();
              }}
            >
              <ButtonCell>
                <PlusSign width={15} height={15} />
              </ButtonCell>
            </Flex>
          );
        }
        break;
      case 1:
        content = list[rowIndex]["name"];
        break;
      case 2:
        content = list[rowIndex]["ip"];
        break;
      case 3:
        content = (
          <Flex key={key} rowIndex={rowIndex}>
            <Circle height={25} width={25} fill={list[rowIndex]["pubClient"] ? "#0fb79a" : "#ff0000"}/>
          </Flex>
        );
        break;
      case 4:
        content = (
          <Flex key={key} rowIndex={rowIndex}ListeningStateChangedEvent>
            <Circle height={25} width={25} fill={list[rowIndex]["subClient"] ? "#0fb79a" : "#ff0000"}/>
          </Flex>
        );
        break;
      default:
        content = `Bad data - fix me`;
        break;
    }

    return (
      <Cell key={key} rowIndex={rowIndex} style={style}>
        {content}
      </Cell>
    );

  }

  if (list.length > 0) {
    return (
      <Container>
        <GridHeader>
        <div></div>
        <div>node name</div>
        <div>ip</div>
        <div>publisher client</div>
        <div>subscriber client</div>
        </GridHeader>
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              height={height}
              width={width}
              columnCount={Object.keys(columnMap).length}
              columnWidth={({ index }) => {
                switch (index) {
                  case 0:
                    return 30;
                  case 1:
                    return 125;
                  case 2:
                    return 140;
                  case 3:
                    return 80;
                  case 4:
                    return 80;
                  default:
                    return 50;
                }
              }}
              cellRenderer={({ columnIndex, key, rowIndex, style }) =>
                cellRenderer(columnIndex, key, rowIndex, style)
              }
              rowCount={list.length}
              rowHeight={25}
              ref={GridRef}
            />
          )}
        </AutoSizer>
      </Container>
    );
  } else {
    return <>[]</>;
  }
}

export default NodeList;
