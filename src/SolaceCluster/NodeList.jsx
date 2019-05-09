import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Grid, AutoSizer } from "react-virtualized";
import SolaceSvg from "../UI/Logos/PubSubLogo";
import { X, DownArrow } from "../UI/Icons";

/**
 * Styling
 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const OptionRow = styled.div``;

const OptionRowHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

const OptionRowButton = styled.div`
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const OptionRowContent = styled.div`
  display: ${props => (props.open ? "block" : "none")};
`;

const Row = styled.div`
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;

  & :hover {
    color: #0000ee;
    background-color: #dee2e6;
  }
`;

/**
 * Logic
 */

const columnMap = [
  "name",
  "ip"
]

function NodeList({ list, currentNode, onRowClick }) {
  if(list.length > 0) {
    return (
      <Container>
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              height={height}
              width={width}
              rowHeight={43.4}
              columnWidth={({index}) => {
                switch (index) {
                  case 0:
                    return 200;
                  case 1:
                    return 200;
                  case 2:
                    return 200;
                  case 3:
                    return 50;
                  default:
                    return 50;
                }
              }}
              columnCount={Object.keys(columnMap).length}
              rowCount={list.length}
              cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                let content;                
                switch (columnIndex) {
                  case 0:
                    content = list[rowIndex]["name"];
                    break;
                  case 1:
                    content = list[rowIndex]["ip"];
                    break;
                  default:
                    content = `Bad data - fix me`
                    break;
                }
                return (
                  <Row
                    onClick={() =>{
                      if(currentNode) {
                        if(currentNode['label'] == list[rowIndex]["name"]) {
                          onRowClick(null)
                        } else {
                          onRowClick({
                            id: list[rowIndex]["ip"],
                            label: list[rowIndex]["name"]
                          })
                        }
                      } else {
                        onRowClick({
                          id: list[rowIndex]["ip"],
                          label: list[rowIndex]["name"]
                        })
                      }
                    }
                    }
                    key={key}
                    style={style}
                    rowIndex={rowIndex}
                  >
                    <FlexRow>
                      {/* <div style={{ "margin-right": "10px" }}>
                        <SolaceSvg height={24} />
                      </div> */}
                      <div>{content}</div>
                    </FlexRow>
                  </Row>
                );
              }}
            />
          )}
        </AutoSizer>
      </Container>
    );
  } else {
    return (
      <>[]</>
    );
  }
}

export default NodeList;
