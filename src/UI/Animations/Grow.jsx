import styled, { keyframes } from 'styled-components'
import BaseAnimation from './BaseAnimation'

const GrowAnimation = keyframes`
  0% {
    transform: scale(1.0);
  }
  100% {
    transform: scale(1.2);
  } 
`

const Grow = styled(BaseAnimation)`
  transition: all 0.5s ease-in-out;
  animation-name: ${props => props.active ? GrowAnimation : ''};
`

export default Grow