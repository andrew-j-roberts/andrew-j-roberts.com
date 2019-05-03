import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { 
  Folder, 
  GitHubLogo,
  LeftArrow,
  RightArrow 
} from '../../UI/Icons'

import BreadcrumbTrail from '../../UI/BreadcrumbTrail/View'

const Flex = styled.div`
  display: flex;
`

const Centered = styled.div`
  display: flex;
  justify-content: center;
`

const Toolbar = styled.div`
  height: 45px;
  display: grid;
  grid-template-columns: 9fr 1fr;
  align-items: center;
  background-color: #FFFFFF;
` 

const NavigationArrow = styled.div`
  padding: 10px;
  background-color: #FFFFFF;
  cursor: pointer;
  align-items: center;
  margin-bottom: -4px; 

  & :hover {
    color: #0000EE;
    background-color: #dee2e6;
  }
`

const Header = styled.div`
  height: 45px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  background-color: #FFFFFF;
  border-bottom: 1px solid #A9A9A9;
` 

const FileList = styled.div`
  height: 90vh;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

const File = styled.div`
  height: 35px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  border-bottom: 1px solid #A9A9A9;
  background-color: #FFFFFF;
  cursor: pointer;

  & :hover {
    color: #0000EE;
    background-color: #dee2e6;
  }
`

const FileName = styled.div`
  height: 25px;
  display: grid;
  grid-template-columns: 1fr 4fr;
`

const getIcon = (fileType) => {
  switch (fileType) {
    case 'Directory': 
      return <Folder height="25px"/>
    case 'GitHub repo':
      return <GitHubLogo height="25px"/>
    default:
      return <></>
  }
}

const dummyFiles = [
  {
    name: "andrew-j-roberts.com",
    type: "Directory",
    lastModified: "Sun Apr 21 1:59 PM"
  },
  {
    name: "andrew-j-roberts.com",
    type: "GitHub repo",
    lastModified: "Sun Apr 21 1:45 PM"
  }
]

const fileSystem = {
  'home': {
    fileType: "Directory",
    childrenNodes: ['projects']
  },
  'projects': {
    fileType: "Directory",
    childrenNodes: ['solace-demo']
  },
  'projects/solace-demo': {
    fileType: "Project",
    projectUrl: "andrew-j-roberts.com/projects/solace-demo"
  }
}

const FileSystem = ({dataSource, ...rest}) => {
  const [files, setFiles] = useState()
  const [path, setPath] = useState([])
  // useEffect(() => {
    
  // }, []
  // )

  // HOW TO SOLVE NAVIGATION PROBLEM
  // PROBLEM:  WHEN I CLICK ON A DIRECTORY IN THE FILE SYSTEM, WHAT HAPPENS?
  // TRY #1:  load(file), then path.push(directory name)
  //  ###
  // load(file) — respond to file type, e.g. file, directory, github-repo, etc.  
  // For example:  file opens react-pdf, project opens the route, etc.
  // ###
  // path.push(directory name) - file system manages the path 
  // Do I have the FileSystem respond to the URL match
  // On load — reach out to DynamoDb and see the type of the current URL (directory, project, etc.)



  // if(!data) {
  //   return (
  //     <p>Loading...</p>
  //   )
  // }
  
  return (
    <>
      <Toolbar>
        <BreadcrumbTrail pathArray={["home", "projects", "andrew-j-roberts.com"]}/>
      </Toolbar>
      <Header>
        <div>name</div>
        <div>type</div>
        <div>last modified</div>
      </Header>
      <FileList>
        {
          dummyFiles.map((item,i) => {
            return (
              <File key={i}>
                <FileName>
                  <Centered>{getIcon(item['type'])}</Centered>
                  <div>{item['name']}</div>
                </FileName>
                <div>{item['type']}</div>
                <div>{item['lastModified']}</div>
              </File>
            )
          })
        }
      </FileList>
    </>
  )
}

export default FileSystem