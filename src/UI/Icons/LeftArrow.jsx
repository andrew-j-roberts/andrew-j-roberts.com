import React from "react"

const LeftArrow = props => {
  return (
    <svg viewBox="0 0 50 50" {...props}>
      <g
        transform="translate(0 -247)"
        fillRule="evenodd"
        stroke="#000"
        strokeWidth={0.265}
        strokeLinecap="round"
        paintOrder="markers stroke fill"
      >
        <rect
          width={25.171}
          height={4.841}
          x={-182.034}
          y={202.383}
          ry={2.42}
          transform="rotate(-45)"
        />
        <rect
          ry={2.42}
          y={177.442}
          x={202.632}
          height={4.841}
          width={25.171}
          transform="rotate(45)"
        />
      </g>
    </svg>
  )
}

export default LeftArrow