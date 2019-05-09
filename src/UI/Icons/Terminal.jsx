import React from "react";

const Terminal = props => (
  <svg width="150mm" height="95mm" viewBox="0 0 150 95" {...props}>
    <g
      transform="translate(0 -202)"
      fillRule="evenodd"
      stroke="#000"
      strokeWidth={0.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      paintOrder="markers stroke fill"
    >
      <path d="M1 203.765v91.47h148v-91.47zm5.532 3.65h136.936v12.204H6.532zm22.566 24.049l28.175 23.382-.605.502.605.503-28.175 23.383-5.59-4.64L46.7 255.349l-23.191-19.246zm40.019 39.347h45.357v8.316H69.117z" />
      <circle cx={13.555} cy={213.214} r={4.158} />
      <circle r={4.158} cy={213.214} cx={34.721} />
      <circle cx={24.138} cy={213.214} r={4.158} />
    </g>
  </svg>
);

export default Terminal;