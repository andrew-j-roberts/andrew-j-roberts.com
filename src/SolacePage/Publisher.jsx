import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import useInputState from '../UI/Input/useInputState'
import { TopicPublisher } from './SolaceClient/TopicPublisher'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const Panel = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 3px #333;
  padding: 10px;
`

const Publisher = ({ setMessageSent, solaceModule, eventBrokerAgent, topicName, ...rest })=> {
  const { value, reset, onChange } = useInputState('')
  const [publisher, setPublisher] = useState(null)
  const publisherRef = useRef() // for position to draw lines
  
  useEffect(() => {
    const topicPublisher = TopicPublisher(solaceModule, topicName)
    topicPublisher.run(
      eventBrokerAgent.hostUrl,  // "http://104.155.86.62",
      eventBrokerAgent.vpnName,  //  default
      eventBrokerAgent.userName, // "admin",
      eventBrokerAgent.password  // "admin1234" <-- secrets management goes here
    )
    setPublisher(topicPublisher)
    }, [solaceModule, eventBrokerAgent, topicName] 
  )

  if(!publisher) {
    return <p>[Publisher] Connecting to event broker...</p>
  }
  else {
    return (
      <FlexColumn >
        <h3 style={{"marginTop": 0}}>publisher</h3>
        <Panel ref={publisherRef} className={rest.className}>
          {rest.setPublisherRef(publisherRef) /* get position at render time*/}
          <p style={{"marginTop": 0}}>send a message to topic '{topicName}'</p>
          <form style={{"paddingBottom": '10px'}} onSubmit={event => {
                    event.preventDefault()
                    setMessageSent(false)
                    console.log(value)
                    publisher.publish(value)
                    setMessageSent(true)
                    reset()
                  }}
          >
            <input 
                type="text" 
                value={value} 
                onChange={onChange} 
                placeholder={"Enter a message..."}
                style={{"width":"75%"}}
            />
          </form>
          <hr/>
          <h4 style={{"marginBottom":'10px', "marginTop": '10px', "font-weight": 'bolder'}}>PubSub+ broker details</h4>
          <FlexRow><small style={{"marginTop": 0, "paddingRight": "10px"}}><b>cloud provider: </b></small>{eventBrokerAgent.logo}</FlexRow>
          <div><small style={{"marginTop": 0}}><b>region: </b> {eventBrokerAgent.region}</small></div>
          <div><small style={{"marginTop": 0}}><b>host url: </b>{eventBrokerAgent.hostUrl}</small></div>
          <div><small style={{"marginTop": 0}}><b>cluster: </b>{eventBrokerAgent.cluster}</small></div>
          <div><small style={{"marginTop": 0}}><b>deployment: </b>{eventBrokerAgent.deployment}</small></div>
        </Panel>
      </FlexColumn>
    )
  }
}

export default Publisher