import React from "react";
import styled, {keyframes, css} from 'styled-components'

const BounceAnimation = keyframes`
  0%, 20% {
    transform: translateY(0px);
  }
  10% {
    transform: translateY(-8px);
  }
`

const AnimatedLetter = styled.g`
  animation: ${props => props.active && css`${BounceAnimation} 1s ease-in-out infinite;`};
  animation-delay: ${props => props.delay};
  animation-fill-mode: forwards;
`

const Logo = props => {
  var {isHovered, onMouseEnter, onMouseExit, ...rest} = props
  return <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseExit} style={{"display":"inline-table"}}>
    <svg
    osb="http://www.openswatchbook.org/uri/2009/osb"
    viewBox="0 0 55 55"
    cursor="pointer"
    {...rest}
    >
      <defs>
        <linearGradient id="ajr-logo_svg__c">
          <stop offset={0} />
          <stop offset={1} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="ajr-logo_svg__b">
          <stop offset={0} />
          <stop offset={1} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="ajr-logo_svg__a" paint="solid">
          <stop offset={0} stopColor="#fff" />
        </linearGradient>
      </defs>
      <g
        fontWeight={400}
        fontSize={24.694}
        fontFamily="Meslo LG M for Powerline"
        letterSpacing={0}
        wordSpacing={0}
        fill="#000"
        stroke="#000"
        strokeWidth={1}
      >
        <AnimatedLetter active={isHovered} delay={'0s'}>
          <text
            style={{
              lineHeight: 1.25,
              InkscapeFontSpecification: "'Meslo LG M for Powerline, Normal'",
              fontVariantLigatures: "normal",
              fontVariantCaps: "normal",
              fontVariantNumeric: "normal",
              fontFeatureSettings: "normal",
              textAlign: "start"
            }}
            x={6.162}
            y={276.24}
            opacity={0.95}
            transform="translate(0 -242)"
          >
            <tspan
              x={6.162}
              y={276.24}
              style={{
                InkscapeFontSpecification: "'Meslo LG M for Powerline, Normal'",
                fontVariantLigatures: "normal",
                fontVariantCaps: "normal",
                fontVariantNumeric: "normal",
                fontFeatureSettings: "normal",
                textAlign: "start"
              }}
            >
              {"a"}
            </tspan>
          </text>
        </AnimatedLetter>
        <AnimatedLetter active={isHovered} delay={'0.25s'}>
          <text
          y={276.313}
          x={21.524}
          style={{
            lineHeight: 1.25,
            InkscapeFontSpecification: "'Meslo LG M for Powerline, Normal'",
            fontVariantLigatures: "normal",
            fontVariantCaps: "normal",
            fontVariantNumeric: "normal",
            fontFeatureSettings: "normal",
            textAlign: "start"
          }}
          opacity={0.95}
          transform="translate(0 -242)"
        >
          <tspan
            style={{
              InkscapeFontSpecification: "'Meslo LG M for Powerline, Normal'",
              fontVariantLigatures: "normal",
              fontVariantCaps: "normal",
              fontVariantNumeric: "normal",
              fontFeatureSettings: "normal",
              textAlign: "start"
            }}
            y={276.313}
            x={21.524}
          >
            {"j"}
          </tspan>
        </text>
        </AnimatedLetter>
        <AnimatedLetter active={isHovered} delay={'0.5s'}>
          <text
            style={{
              lineHeight: 1.25,
              InkscapeFontSpecification: "''",
              fontVariantLigatures: "normal",
              fontVariantCaps: "normal",
              fontVariantNumeric: "normal",
              fontFeatureSettings: "normal",
              textAlign: "start"
            }}
            x={33.307}
            y={276.415}
            opacity={0.95}
            transform="translate(0 -242)"
          >
            <tspan
              x={33.307}
              y={276.415}
              style={{
                InkscapeFontSpecification: "''",
                fontVariantLigatures: "normal",
                fontVariantCaps: "normal",
                fontVariantNumeric: "normal",
                fontFeatureSettings: "normal",
                textAlign: "start"
              }}
            >
              {"r"}
            </tspan>
          </text>
        </AnimatedLetter>
      </g>
    </svg>
  </div>
}

class AnimatedLogo extends React.Component {
  state = {
    isHovered: false
  }

  onMouseEnter = () => {
    this.setState({isHovered: true})
  }

  onMouseExit = () => {
    this.setState({isHovered: false})
  }

  render () {
    return (
      <Logo 
        isHovered={this.state.isHovered} 
        onMouseEnter={this.onMouseEnter} 
        onMouseExit={this.onMouseExit} 
        {...this.props} 
      />
    )
  }

}

export default AnimatedLogo;