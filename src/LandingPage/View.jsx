import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import Header from './Header'
import Menu from './Menu'
import Resume from '../Resume/View'

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

const Toggle = styled.button`
  position: fixed;
  top: ${props => props.open ? '-25px' : '25px'};
  left: ${props => props.open ? '-25px' : '25px'};
  transition: all 0.5s;
  transition-delay: 0.25s;
`

const ClosedMenuHamburger = props => (
  <svg viewBox="0 0 55 55" {...props}>
    <g transform="translate(0 -242)" fill="#d3d3d3">
      <rect
        width={34.018}
        height={7.938}
        x={10.491}
        y={254.154}
        ry={3.969}
        opacity={0.95}
      />
      <rect
        ry={3.969}
        y={265.531}
        x={10.491}
        height={7.938}
        width={34.018}
        opacity={0.95}
      />
      <rect
        width={34.018}
        height={7.938}
        x={10.491}
        y={276.908}
        ry={3.969}
        opacity={0.95}
      />
    </g>
  </svg>
)

const Content = styled.div`
  flex: auto;
  min-height: calc(100vh - 70px);
  height: 90vh;
  overflow: auto;
  transition: all 0.5s;
`

const LandingPage = props => {
  const [isSideBarOpen, toggleSideBar] = useState(true)
  return (
    <>
      <NavBar/>
      <Flex>
        <LeftSidebar open={isSideBarOpen}>
          <Menu></Menu>
        </LeftSidebar>
        <Content open={isSideBarOpen}>
          <Route exact path='/resume' render={() => <Resume/>} />    
        </Content>
      </Flex>
    </>
  )
}

export default LandingPage