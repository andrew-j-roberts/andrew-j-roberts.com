import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import NodeList from './NodeList'
import Visualizer from './Visualizer'

// UI
const Grid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
`

const SolaceClusterPage = () => {  
  const demoList = ["169.169.169.1", "169.169.169.2", "169.169.169.3", "169.169.169.4"]
  const [host, setHost] = useState(demoList[0]) // eventually the node they enter
  
  return (
    <Grid>
      <NodeList list={demoList}/>
      <Visualizer/>
    </Grid>
  )
}

export default SolaceClusterPage