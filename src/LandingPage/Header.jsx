import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// animations, icons, logos
import AnimatedLogo from './AnimatedLogo'

import { 
  LeftArrow,
  Menuhamburger
 } from '../UI/Icons'

import { 
  BounceLeft,
  Grow
} from '../UI/Animations'

const Flex = styled.div`
  display: flex;
`

const SidebarHeader = styled.div`
  height: 10vh;
  min-height: 70px;
  width: 250px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const BrandLogo = styled(Link)`
  height: 100%;
  display: flex;
  cursor: pointer;
  text-decoration: none;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
` 

const Toggle = ({isOpen, toggle, ...rest}) => {
  const [isHovered, setHovered] = useState(false)
  return (
    <Flex onClick={()=> toggle(!isOpen)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} {...rest}>
    {
      isOpen
      ?
        <BounceLeft 
          active={isHovered} 
          fillMode='forwards'
          playState={isHovered => isHovered ? 'running' : 'stopped'}
          duration={'0.5s'}
          iterationCount={'infinite'}
        >
          <LeftArrow height={'35px'} width={'35px'} />
        </BounceLeft>
      :
        <Grow
          active={isHovered} 
          fillMode='forwards'
          playState={isHovered => isHovered ? 'running' : 'stopped'}
          duration={'0.5s'}
          iterationCount={1}
        >
          <Menuhamburger height={'35px'} width={'35px'}/> 
        </Grow>
    }
    <b style={{"padding-left": "10px"}}>menu</b>
    </Flex>
  )
}

const MenuToggle = styled(Toggle)`
  height: 100%;
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  cursor: pointer;
  color: #000000;
  text-decoration: none;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  overflow: hidden;

  & :hover {
    color: #0000EE;
    background-color: #dee2e6;
  }
`


const Header = props => {
  return (
    <Flex className={props.className}>
      <SidebarHeader>
        <BrandLogo to='/'>
          <AnimatedLogo height={'70px'}/>
        </BrandLogo>
        <MenuToggle toggle={props.toggle} isOpen={props.isOpen}/>
      </SidebarHeader>
    </Flex>
  )
}

export default Header