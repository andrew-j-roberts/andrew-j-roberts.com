import React from 'react'
import { withRouter } from 'react-router-dom'

class App extends React.Component {

  render() {
    return (
      <main id="content">
        <div id="background">
          <p>Hi</p>
        </div>
      </main>
	  )
  }
}

export default withRouter(App)