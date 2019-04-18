import styled, { keyframes } from 'styled-components'
import BaseAnimation from './BaseAnimation'

const BounceLeftAnimation = keyframes`  
  0%, 100% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-6px);
  }
`

const BounceLeft = styled(BaseAnimation)`
  animation-name: ${props => props.active ? BounceLeftAnimation : ''};
`

export default BounceLeft