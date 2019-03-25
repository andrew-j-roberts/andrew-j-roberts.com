import React from 'react'
import styled from 'styled-components'
import AnimatedLogo from './AnimatedLogo'

const Flex = styled.div`
  display: flex;
  padding-left: 25px;
`

const Header = props => {
  return (
    <Flex className={props.className}>
      <AnimatedLogo height={'70px'}/>
    </Flex>
  )
}

export default Header