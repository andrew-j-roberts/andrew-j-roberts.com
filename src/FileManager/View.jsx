import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import GUI from './GUI/View'
import FileSystem from './FileSystem/View'

const Flexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
` 
// <FileSystem dataSource={[{name: "File.txt"}, {name: "File2.txt"}]}/>
const FileManager = props => {
  return (
    <FileSystem/>
  )
}

export default FileManager