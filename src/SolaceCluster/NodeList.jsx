import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import { List, AutoSizer } from "react-virtualized"

import SolaceSvg from './PubSubLogo'

/** 
 * Styling
 */

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  background-color: ${props => props.rowIndex % 2 === 0 ? '#FFFFFF' : '#F5F5F5'};
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;

  & :hover {
    color: #0000EE;
    background-color: #dee2e6;
  }
`

const Container = styled.div`
  flex-grow: 1;
  padding: 5px;
`

/**
 * Logic
 */

// Would have used something like this to get a well rendered 


// const getSingleEmInPixels = () => {
//   let low = 0;
//   let high = 200;
//   let emWidth = Math.round((high - low) / 2) + low;
//   let iters = 0;
//   const maxIters = 10;
//   while (high - low > 1) {
//       const match = window.matchMedia(`(min-width: ${emWidth}em)`).matches;
//       iters += 1;
//       if (match) {
//           low = emWidth;
//       } else {
//           high = emWidth;
//       }
//       emWidth = Math.round((high - low) / 2) + low;
//       if (iters > maxIters) {
//           console.warn(`max iterations reached ${iters}`);
//           break;
//       }
//   }
//   const singleEmPx = Math.ceil(window.innerWidth / emWidth);
//   return singleEmPx;
// }

const NodeList = ({ list, onRowClick }) => {  
  //let em = getSingleEmInPixels()
  return (
    <FlexColumn>
      <div>
        <h4>Total broker agents found: {list.length}</h4>
      </div>
      <Container>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              rowHeight={43.4}
              rowCount={list.length}
              rowRenderer={({ index, key, style }) => (
                <Row onClick={onRowClick} key={key} style={style} rowIndex={index}>
                  <FlexRow>
                    <div style={{"margin-right": '10px'}}><SolaceSvg height={23.4} /></div>
                    <div>{list[index]}</div>
                  </FlexRow>
                </Row>
              )}
            />
          )}
        </AutoSizer>
      </Container>
    </FlexColumn>
  )
}

export default NodeList