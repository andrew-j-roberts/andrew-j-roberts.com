import React from 'react'
import styled from 'styled-components'

const NavList = styled.div`
  display: grid;
  grid-template-rows: repeat(1, auto);
`

const MenuItem = styled.div`
  padding: 15px;
  display: flex;
  cursor: pointer;
`

const NavLink = styled(MenuItem)`
  & :hover {
    color: #0000EE;
    background-color: #dee2e6;
  }
`

const Menu = props => {
  return (
    <NavList>
      <NavLink>
        résumé
      </NavLink>
    </NavList>
  )
}

export default Menu