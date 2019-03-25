import React from 'react'
import styled, {css} from 'styled-components'

import AnimatedLogo from './AnimatedLogo'

const NavList = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
`

const MenuHamburger = styled.button`

`

const MenuItem = styled.div`
  padding: 15px;
  display: flex;
  cursor: pointer;
`

const NavLink = styled(MenuItem)`
  & :hover {
    color: #0d6790ff;
    background-color: #dee2e6;
  }
`

const Menu = props => {
  return (
    <NavList>
        <NavLink>
          projects
        </NavLink >
        <NavLink>
          animations
        </NavLink>
        <NavLink>
          résumé
        </NavLink>
        {/* <NavLink>
          technical blog
        </NavLink>
        <NavLink>
          personal blog
        </NavLink> */}
    </NavList>
  )
}

export default Menu