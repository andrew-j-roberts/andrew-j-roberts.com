import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import Header from './Header'
import Menu from './Menu'
import Resume from '../Resume/View'
import SolacePage from '../SolacePage/View'
import SolaceClusterPage from '../SolaceCluster/View'
import FileManager from '../FileManager/View'

const Flex = styled.div`
  display: flex;
`

const NavBar = styled(Header)`
  height: 10vh;
  min-height: 70px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #A9A9A9;
`

const LeftSidebar = styled.div`
  height: 90vh;
  min-height: calc(100vh - 70px);
  width: ${props => props.open ? '250px' : '0px'};
  min-width: ${props => props.open ? '250px' : '0px'};
  background-color: #FFFFFF;
  transition: all 0.5s;
  overflow: hidden;

  @media (max-width: 415px) {
    width: ${props => props.open ? '250px' : '0px'};
  }
`

const Content = styled.div`
  flex: auto;
  min-height: calc(100vh - 70px);
  height: 90vh;
  overflow: auto;
  transition: all 0.5s;
`

const LandingPage = props => {
  const [isSideBarOpen, toggleSidebar] = useState(false)
  return (
    <>
      <NavBar isOpen={isSideBarOpen} toggle={toggleSidebar}/>
      <Flex>
        <LeftSidebar open={isSideBarOpen}>
          <Menu />
        </LeftSidebar>
        <Content open={isSideBarOpen}>
          <Route exact path='/resume' render={() => <Resume/>} />    
          <Route exact path='/fs' render={() => <FileManager/>} />  
          <Route exact path='/solace-demo' render={() => <SolacePage/>} />    
          <Route path='/solace-cluster' render={() => <SolaceClusterPage/>} />    
        </Content>
      </Flex>
    </>
  )
}

export default LandingPage