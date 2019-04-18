import React, {useState} from 'react'
import styled from 'styled-components'
import solace from 'solclientjs'
import Publisher from './Publisher'
import Subscriber from './Subscriber'
import AwsLogo from '../UI/Logos/AwsLogo'
import GcpLogo from '../UI/Logos/GcpLogo'
import Line from '../UI/Objects/Line'
import MovingArrow from '../UI/Objects/MovingArrow';
import resizeWindow from '../UI/Window/resizeWindow'

// solace event brokers
const eventBrokerAgent_aws_cloud = {
  hostUrl: "http://3.86.143.54",
  vpnName: "default",
  userName: "admin",
  password: "admin", // <-- secrets management goes here
  cluster: "solace-demo-cluster",
  deployment: "single node docker",
  logo: <AwsLogo height={'20px'}/>,
  region: "us-east-1b"
}

const eventBrokerAgent_gcp_kubernetes = {
  hostUrl: "http://34.65.110.202",
  vpnName: "default",
  userName: "admin",
  password: "admin1234",
  cluster: "solace-demo-cluster",
  deployment: "kubernetes",
  logo: <GcpLogo height={'20px'}/>,
  region: "europe-west6-a"
}

// UI
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

const FlexColumn = styled.div`
  min-height: calc(100vh - 70px);
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
const Content = styled.div`
  padding-top: ${props => props.paddingTop};
  padding-left: ${props => props.paddingLeft};
`

// Page
const SolacePage = () => {  
  const [publisherRef, setPublisherRef] = useState(null)
  const [isMessageSent, setMessageSent] = useState(null)
  const [subscriberARef, setSubscriberARef] = useState(null)
  const [subscriberBRef, setSubscriberBRef] = useState(null)
  const window = resizeWindow()

  var factoryProps = new solace.SolclientFactoryProperties()
  factoryProps.profile = solace.SolclientFactoryProfiles.version10
  const solaceModule = solace.SolclientFactory.init(factoryProps)
  return (
    <Content paddingLeft={"25px"}>
      <Grid>
        <FlexRow>
          <FlexColumn>
            <Publisher 
              setMessageSent={setMessageSent}
              solaceModule={solaceModule}
              eventBrokerAgent={eventBrokerAgent_aws_cloud}
              topicName={'test'}
              setPublisherRef={setPublisherRef}
            />
          </FlexColumn>
        </FlexRow>
        <FlexRow>
          <FlexColumn>
            <Subscriber 
              name={"A"}
              solaceModule={solaceModule}
              eventBrokerAgent={eventBrokerAgent_gcp_kubernetes}
              topicName={'test'}
              setSubscriberRef={setSubscriberARef}
            />
            <Subscriber
              name={"B"}
              solaceModule={solaceModule}
              eventBrokerAgent={eventBrokerAgent_aws_cloud}
              topicName={'test'}
              setSubscriberRef={setSubscriberBRef}
            />
          </FlexColumn>
        </FlexRow>
      </Grid>
      <Line objARef={publisherRef} objBRef={subscriberARef}/>
      <Line objARef={publisherRef} objBRef={subscriberBRef}/>
      {console.log(isMessageSent)}
      {
        isMessageSent
        && (
          <>
            <MovingArrow objARef={publisherRef} objBRef={subscriberARef}/>
            <MovingArrow objARef={publisherRef} objBRef={subscriberBRef}/>
          </>
        )
      }
    </Content>
  )
}

export default SolacePage