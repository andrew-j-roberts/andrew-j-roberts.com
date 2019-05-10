import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

const Flexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
` 

const Toolbar = styled.div`
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
`

const Content = styled.div`
  flex: auto;
  min-height: calc(100vh - 70px);
  height: 90vh;
  overflow: auto;
  transition: all 0.5s;
  background-color: #FFABCD;
`

const favorites = [
  {
    label: "home",
    value: "/"
  },
  {
    label: "projects",
    value: "/projects"
  }
]

const GUI = ({dataSource, ...rest}) => (
  <>
    <Toolbar />
    <LeftSidebar>

    </LeftSidebar>
    <Content>

    </Content>
  </>
)

export default GUI