// MovingArrow
// Moves from center right of objA -> center left of objB (may add optional positioning)

// Where I learned:
// https://blog.greggant.com/posts/2018/10/16/drawing-svg-lines-between-multiple-dom-objects.html
// https://stackoverflow.com/questions/32667847/get-divs-offsettop-positions-in-react/32733059

import React from "react"
import styled from 'styled-components'
import { MoveAlongPath } from '../Animations'
import { RightArrow } from '../Icons'

const MovingArrowSvg = ({objARef, objBRef, ...rest}) => {
  if(objARef && objBRef){
    console.log(objARef, objBRef)
    // path magic https://css-tricks.com/svg-path-syntax-illustrated-guide/
    let path = `M ${objARef.current.offsetLeft + objARef.current.offsetWidth} ${objARef.current.offsetTop + (0.5 * objARef.current.offsetHeight)} L ${objBRef.current.offsetLeft} ${objBRef.current.offsetTop + (0.5 * objBRef.current.offsetHeight) }`
    return (
      <MoveAlongPath path={path}> 
        <RightArrow marginTop="5px" height="20px" />
      </MoveAlongPath>
    )
  }
  else {
    return <></>
  }
}

// z-index -1 pulls item out of static context so it doesn't cover up all other objects
const MovingArrow = styled(MovingArrowSvg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
`


export default MovingArrow