import React from "react";

const PlusSign = props => (
  <svg viewBox="0 0 50 50" {...props}>
    <g fillRule="evenodd" paintOrder="markers stroke fill">
      <path d="M0 20h50v10H0z" />
      <path d="M20 50V0h10v50z" />
    </g>
  </svg>
);

export default PlusSign;