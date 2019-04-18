// Where I learned:
// https://blog.greggant.com/posts/2018/10/16/drawing-svg-lines-between-multiple-dom-objects.html
// https://stackoverflow.com/questions/32667847/get-divs-offsettop-positions-in-react/32733059

import React from "react"
import styled from 'styled-components'

const LineSvg = ({objARef, objBRef, ...rest}) => {
  if(objARef && objBRef){
    console.log(objARef, objBRef)
    // path magic https://css-tricks.com/svg-path-syntax-illustrated-guide/
    let path = `M ${objARef.current.offsetLeft + objARef.current.offsetWidth} ${objARef.current.offsetTop + (0.5 * objARef.current.offsetHeight)} L ${objBRef.current.offsetLeft} ${objBRef.current.offsetTop + (0.5 * objBRef.current.offsetHeight) }`
    return (
      <svg className={rest.className}>
        <path strokeWidth="1px" stroke="#000000" d={path}/>
      </svg>
    )
  }
  else {
    return <></>
  }
}

// z-index -1 pulls item out of static context so it doesn't cover up all other objects
const Line = styled(LineSvg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
`


export default Line