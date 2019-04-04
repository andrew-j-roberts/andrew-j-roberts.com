import React from 'react'
import styled from 'styled-components'
import { query } from '../GraphqlClient/Query'
import { Document, Page } from 'react-pdf/dist/entry.parcel'
import 'react-pdf/dist/Page/AnnotationLayer.css'

const Flexbox = styled.div`
  display: flex;
`

const Header = styled(Flexbox)`
  border-bottom: 1px solid #A9A9A9;
  padding: 10px;
`

const Main = styled(Flexbox)`
  height: calc(100vh - 171px);
  padding-top: 25px;
  margin-bottom: 25px;
  overflow: scroll;
` 

const FilepathBreadcrumbs = styled.div`
  font-size: 18px;
`

const DocumentViewer = styled.div`
  margin-left: auto;
  margin-right: auto;
`

const BorderedPage = styled(Page)`
  border: 1px solid #A9A9A9;
`

class Resume extends React.Component {
  state = {
    documentBase64: null,
    numPages: null,
    pageNumber: 1,
  }

  componentDidMount() {
    this.loadDocument()
  }

  loadDocument = async () => {
    query(`{ file(name: "resume_AndrewRoberts.pdf") { name, content } }`)
    .then(async (res)=> {
      let documentBase64 = res['data']['file']['content']
      console.log(documentBase64)
      this.setState({ documentBase64 })
    })
    .catch(err => {console.log(err)})
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
            files > résumé_AndrewRoberts.pdf
          </FilepathBreadcrumbs>
        </Header>
        <Main>
          <DocumentViewer>
            <Document file={`data:application/pdf;base64,${this.state.documentBase64}`} onLoadSuccess={this.onDocumentLoadSuccess}>
              <BorderedPage pageNumber={pageNumber} />
            </Document>
          </DocumentViewer>
        </Main>
      </>
    )
  }
}

export default Resume