import styled, { keyframes } from 'styled-components'
import BaseAnimation from './BaseAnimation'

const MoveAlongPathAnimation = keyframes`  
  0% { 
    offset-distance: 0%;
  }
  100% { 
    offset-distance: 100%;
  }
`

const MoveAlongPath = styled(BaseAnimation)`
  offset-path: path('${props => props.path}');
  animation-name: ${MoveAlongPathAnimation};
  position: absolute;
  top: 0;
  left: 0;
`

export default MoveAlongPath