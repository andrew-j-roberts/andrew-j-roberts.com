import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import LandingPage from './LandingPage/View'

class App extends React.Component {

  render() {
    return (
      <main id="content">
        <div id="background">
          <Route path='/' render={() => <LandingPage/>} />
        </div>
      </main>
	  )
  }
}

export default withRouter(App)