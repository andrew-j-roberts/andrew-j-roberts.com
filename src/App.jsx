import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { client } from './ApolloClient/client'
import LandingPage from './LandingPage/View'

class App extends React.Component {

  render() {
    return (
      <main id="content">
        <div id="background">
          <ApolloProvider client={client}>
            <Route path='/' render={() => <LandingPage/>} />
          </ApolloProvider>
        </div>
      </main>
	  )
  }
}

export default withRouter(App)