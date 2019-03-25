import React from 'react'
import styled from 'styled-components'
import { Document, Page } from 'react-pdf/dist/entry.parcel'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import resumePDF from './resume-AndrewRoberts.pdf'

const Flexbox = styled.div`
  display: flex;
`

const Header = styled(Flexbox)`
  height: 30px;
  border-bottom: 1px solid #A9A9A9;
  padding: 10px;
`

const Main = styled(Flexbox)`
  height: calc(100vh - 171px);
  padding-top: 25px;
  padding-bottom: 25px;
  overflow: scroll;
` 

const FilepathBreadcrumbs = styled.div`
  font-size: 18px;
`

const DocumentViewer = styled(Document)`
  margin-left: auto;
  margin-right: auto;
`

const BorderedPage = styled(Page)`
  border: 1px solid #A9A9A9;
`

class Resume extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages })
  }

  render() {
    const { pageNumber, numPages } = this.state

    return (
      <>
        <Header>
          <FilepathBreadcrumbs>
            resume > resume_AndrewRoberts.pdf
          </FilepathBreadcrumbs>
        </Header>
        <Main>
          <DocumentViewer file={resumePDF} onLoadSuccess={this.onDocumentLoadSuccess}>
            <BorderedPage pageNumber={pageNumber} />
          </DocumentViewer>
        </Main>
      </>
    )
  }
}

export default Resume