import React from "react";

const Circle = props => (
  <svg viewBox="0 0 50 50" {...props}>
    <circle
      cx={25}
      cy={272}
      r={22.628}
      fillRule="evenodd"
      fill={props.fill}
      paintOrder="markers stroke fill"
      transform="translate(0 -247)"
    />
  </svg>
);

export default Circle;