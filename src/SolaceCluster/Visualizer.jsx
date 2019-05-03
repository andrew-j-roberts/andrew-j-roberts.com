import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import useResizeAware from 'react-resize-aware';  // my favorite 
import ForceDirectedGraph from './ForceDirectedGraph'

/**
 * Styles
 */

const Content = styled.div`
  flex-grow: 1;
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative; 
  line-height:0;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TabBar = styled.div`
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  height: 60px;
`

const Tab = styled.div`
  cursor: pointer;
  border: none;
  height: 30px;
  outline: none;
  padding: 14px 16px;
  transition: 0.3s;

  & :hover {
    color: #0000EE;
    background-color: #dee2e6;
  }
`


/**
 * Logic
 */
const HostDetails = ({ hostIp }) => {
  return (
    <>{hostIp}</>
  )
}

const ClusterDiagram = ({ hostIp }) => {
  const [resizeListener, sizes] = useResizeAware()
  return (
    <Container style={{"background-color": "red"}}>
      {resizeListener}
      {console.log("cluster:",sizes.height, sizes.width)}
      {
        sizes.height
        ? 
          <ForceDirectedGraph
            height={sizes.height}
            width={sizes.width}
          />
        :
          <></>
      }
    </Container>
  )
}

 const views = {
   details: <HostDetails hostIp={'ABC123'}/>,
   diagram: <ClusterDiagram/>
 }

const Visualizer = () => {  
  const [view, setView] = useState('details') // details OR diagram
  
  return (
    <FlexColumn>
      <TabBar>
        <Tab onClick={() => setView('details')}>Host details</Tab>
        <Tab onClick={() => setView('diagram')}>Cluster diagram</Tab>
      </TabBar>
      <Content>
        { views[view] }
      </Content>
    </FlexColumn>
  )
}

export default Visualizer