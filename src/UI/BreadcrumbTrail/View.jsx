import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
`

const Centered = styled.div`
  display: flex;
  justify-content: center;
`

const Breadcrumb = styled.div`
  cursor: pointer;

  & :hover {
    color: #0000EE;
    background-color: #dee2e6;
  }
`

const Separator = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`

const BreadcrumbTrail = ({ pathArray, limit, ...rest}) => {
  // logic deciding which breadcrumbs get displayed goes here
  return (
    <Flex>
      {
        pathArray.map((item,i) => {
          return (
            <Flex>
              <Breadcrumb>{item}</Breadcrumb>
              <Separator>/</Separator>
            </Flex>
          )
        })
      }
    </Flex>
  )
}

export default BreadcrumbTrail