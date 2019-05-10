import React from "react";

const X = props => (
  <svg viewBox="0 0 50 50" {...props}>
    <g fillRule="evenodd" paintOrder="markers stroke fill">
      <path d="M0 43.815L43.814 0 50 6.186 6.186 50z" />
      <path d="M43.814 50L0 6.185 6.186 0 50 43.814z" />
    </g>
  </svg>
);

export default X;
