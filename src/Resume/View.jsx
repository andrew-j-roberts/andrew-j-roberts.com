import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
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

const Resume = () => (
  <Query
    query={gql`
      {
        file(name: "resume_AndrewRoberts.pdf") { 
          name, 
          content 
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      return <>
          <Header>
            <FilepathBreadcrumbs>
              files > {data.file.name}
            </FilepathBreadcrumbs>
          </Header>
          <Main>
            <DocumentViewer>
              <Document file={`data:application/pdf;base64,${data.file.content}`}>
                <BorderedPage pageNumber={1} />
              </Document>
            </DocumentViewer>
          </Main>
        </>
    }}
  </Query>
)

export default Resume