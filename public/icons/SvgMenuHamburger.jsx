import React from "react";

const SvgMenuHamburger = props => (
  <svg
    viewBox="0 0 100 100"
    fillRule="evenodd"
    fill="#bfbfbf"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M-.035 0h100.05v22.232H-.035zM-.035 38.865h100.05v22.232H-.035zM-.035 77.73h100.05v22.233H-.035z" />
  </svg>
);

export default SvgMenuHamburger;
