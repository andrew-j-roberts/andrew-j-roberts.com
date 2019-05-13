import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavList = styled.div`
  display: grid;
  grid-template-rows: repeat(1, auto);
`

const NavLink = styled(Link)`
  padding: 15px;
  width: 250px;
  display: flex;
  cursor: pointer;
  color: #000000;
  text-decoration: none;
  overflow: hidden;

  & :hover {
    color: #0000EE;
    background-color: #dee2e6;
  }
`

const Menu = props => {
  return (
    <NavList>
      {/* <NavLink to="resume">
        resume
      </NavLink> */}
      <NavLink to="solace-demo">
        solace demo v1
      </NavLink>
      <NavLink to="solace-cluster">
        solace demo v2
      </NavLink>
    </NavList>
  )
}

export default Menu