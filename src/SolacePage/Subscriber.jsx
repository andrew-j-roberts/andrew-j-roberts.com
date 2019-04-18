import React, { useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { TopicSubscriber } from './SolaceClient/TopicSubscriber'

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

const messageReducer = (message) => {
  let messageResponse = {
    text: '',
    senderTimestamp: '',
    receiverTimestamp: ''
  }
  try { 
    messageResponse.text = message.getBinaryAttachment()
    messageResponse.senderTimestamp = message.getSenderTimestamp()
    messageResponse.receiverTimestamp = message.getReceiverTimestamp()
  }
  catch {
    messageResponse.text = 'listening...' // is the default message
    messageResponse.senderTimestamp = 0
    messageResponse.receiverTimestamp = 0
  }
  return messageResponse
}

const Subscriber = ({ name, solaceModule, eventBrokerAgent, topicName, ...rest }) => {
  const [ message, setMessage ] = useState("")
  const subscriberRef = useRef() // for position to draw lines

  useEffect(() => {
    let topicSubscriber = TopicSubscriber(solaceModule, topicName, setMessage)
    topicSubscriber.run(
      eventBrokerAgent.hostUrl,  //"http://104.155.86.62",
      eventBrokerAgent.vpnName,  // default
      eventBrokerAgent.userName, //"admin",
      eventBrokerAgent.password  //"admin1234" // <-- secrets management goes here
    )
    }, [solaceModule, topicName] // depends on only solaceModule and topicName)
  )

  let messageResponse = messageReducer(message) // handles case where message hasn't been received yet

  return (
    <FlexColumn className={rest.className}>
      <h3 style={{"marginTop": 0}}>subscriber {name}</h3>
      <Panel ref={subscriberRef} className={rest.className}>
        {rest.setSubscriberRef(subscriberRef) /* get position at render time*/}
        <div><small style={{"marginTop": 0}}><b>message: </b> {messageResponse.text}</small></div>
        <div><small style={{"marginTop": 0}}><b>topic: </b>{topicName}</small></div>
        <div><small style={{"marginTop": 0}}><b>received in: </b>
          {messageResponse.receiverTimestamp ? `${messageResponse.receiverTimestamp - messageResponse.senderTimestamp} ms` : "N/A"}
        </small></div>
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

export default Subscriber