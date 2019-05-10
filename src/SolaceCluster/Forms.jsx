import React, { useState } from "react";
import styled from "styled-components";
import { useInput } from "../Hooks/input-hook";
import { X, Spinner, DownArrow } from "../UI/Icons";

/**
 * Styles
 */

const Flex = styled.div`
  display: flex;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: calc(100vh - 140px);
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-size: ${props => (props.textSize ? props.textSize : "0.75em")};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : "0px")};
  margin-top: ${props => (props.marginTop ? props.marginTop : "0px")};
`;

const Input = styled.input`
  width: 80%;
`;

const Button = styled.button`
  background-color: ${props =>
    props.type == "submit" ? "#0fb79a" : "#FFFFFF"};
  border: ${props => (props.type == "submit" ? "none" : "1px solid #ccc")};
  border-radius: 5px;
  color: ${props => (props.type == "submit" ? "white" : "#000000")};
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${props => (props.textSize ? props.textSize : "16px")};
  margin-top: 5px;
`;

const OptionRow = styled.div``;

const OptionRowHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

const OptionRowButton = styled.div`
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const OptionRowContent = styled.div`
  display: ${props => (props.open ? "block" : "none")};
`;

/**
 * Logic
 */

export function FindMeshForm({ 
  defaultIpAddress,
  defaultUsername,
  defaultPassword,
  loadingMode,
  submitHandler
}) {
  const {
    value: ipAddress,
    bind: bindIpAddress,
    reset: resetIpAddress
  } = useInput(defaultIpAddress);
  const {
    value: username,
    bind: bindUsername,
    reset: resetUsername
  } = useInput(defaultUsername);
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword
  } = useInput(defaultPassword);

  const handleSubmit = evt => {
    evt.preventDefault();
    submitHandler(ipAddress, username, password);
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Starting node IP address</Label>
        <Input type="text" {...bindIpAddress} />
      </FormGroup>
      <FormGroup>
        <Label>Username</Label>
        <Input type="text" {...bindUsername} />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" {...bindPassword} />
      </FormGroup>
      <Flex style={{"align-items": "center"}}>
        <Button type="submit">Submit</Button>
        {loadingMode == "loading" && (<Spinner/>)}
      </Flex>
    </form>
  );
}

export function RunCommandsForm({
  defaultUsername,
  defaultPassword,
  connectPublishers,
  publishMessages,
  disconnectPublishers,
  connectSubscribers,
  subscribeToTopic,
  disconnectSubscribers
}) {
  // UI
  const [publishOpen, setPublishOpen] = useState(true);
  const [subscribeOpen, setSubscribeOpen] = useState(true);
  // Publisher Bulk Actions
  // - connectPublishers
  const {
    value: publisherUsername,
    bind: bindPublisherUsername,
    reset: resetPublisherUsername
  } = useInput(defaultUsername);
  const {
    value: publisherPassword,
    bind: bindPublisherPassword,
    reset: resetPublisherPassword
  } = useInput(defaultPassword);
  const handleConnectPublishers = evt => {
    evt.preventDefault();
    connectPublishers(publisherUsername, publisherPassword);
  };
  // - publishMessages
  const {
    value: publisherTopic,
    bind: bindPublisherTopic,
    reset: resetPublisherTopic
  } = useInput("");
  const {
    value: publisherMessage,
    bind: bindPublisherMessage,
    reset: resetPublisherMessage
  } = useInput("");
  const handlePublishMessages = evt => {
    evt.preventDefault();
    publishMessages(publisherTopic, publisherMessage);
  };
  // Subscriber Bulk Actions
  // - connectSubscribers
  const {
    value: subscriberUsername,
    bind: bindSubscriberUsername,
    reset: resetSubscriberUsername
  } = useInput(defaultUsername);
  const {
    value: subscriberPassword,
    bind: bindSubscriberPassword,
    reset: resetSubscriberPassword
  } = useInput(defaultPassword);
  const handleConnectSubscribers = evt => {
    evt.preventDefault();
    connectSubscribers(subscriberUsername, subscriberPassword);
  };
  // - subscribeToTopic
  const {
    value: subscriberTopic,
    bind: bindSubscriberTopic,
    reset: resetSubscriberTopic
  } = useInput("");
  const handleSubscribeToTopic = evt => {
    evt.preventDefault();
    subscribeToTopic(subscriberTopic);
  };

  return (
    <FlexColumn>
      <OptionRowHeader onClick={() => setPublishOpen(!publishOpen)}>
        Publisher Bulk Actions
        <OptionRowButton>
          {publishOpen ? (
            <X height={15} width={15} />
          ) : (
            <DownArrow height={25} width={25} />
          )}
        </OptionRowButton>
      </OptionRowHeader>
      <OptionRowContent open={publishOpen}>
        <Label marginBottom={"5px"} textSize={"14px"}>
          (1) Establish connections
        </Label>
        <form onSubmit={handleConnectPublishers}>
          <FormGroup>
            <Label>Username</Label>
            <Input type="text" {...bindPublisherUsername} />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" {...bindPublisherPassword} />
          </FormGroup>
          <FormGroup>
            <Flex>
              <Button type="submit" style={{ "margin-right": "5px" }}>
                Connect
              </Button>
              <Button type="button" onClick={disconnectPublishers}>Disconnect</Button>
            </Flex>
          </FormGroup>
        </form>
        <Label marginTop={"25px"} marginBottom={"5px"} textSize={"14px"}>
          (2) Publish messages
        </Label>
        <form onSubmit={handlePublishMessages}>
          <FormGroup>
            <Label>Topic</Label>
            <Input type="text" {...bindPublisherTopic} />
          </FormGroup>
          <FormGroup>
            <Label>Message</Label>
            <Input type="Text" {...bindPublisherMessage} />
          </FormGroup>
          <FormGroup>
            <Flex>
              <Button type="submit">Publish</Button>
            </Flex>
          </FormGroup>
        </form>
      </OptionRowContent>
      <OptionRowHeader onClick={() => setSubscribeOpen(!subscribeOpen)}>
        Subscriber Bulk Actions
        <OptionRowButton>
          {subscribeOpen ? (
            <X height={15} width={15} />
          ) : (
            <DownArrow height={25} width={25} />
          )}
        </OptionRowButton>
      </OptionRowHeader>
      <OptionRowContent open={subscribeOpen}>
        <Label marginBottom={"5px"} textSize={"14px"}>
          (1) Establish connections
        </Label>
        <form onSubmit={handleConnectSubscribers}>
          <FormGroup>
            <Label>Username</Label>
            <Input type="text" {...bindSubscriberUsername} />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" {...bindSubscriberPassword} />
          </FormGroup>
          <FormGroup>
            <Flex>
              <Button type="submit" style={{ "margin-right": "5px" }}>
                Connect
              </Button>
              <Button type="button" onClick={disconnectSubscribers}>Disconnect</Button>
            </Flex>
          </FormGroup>
        </form>
        <Label marginTop={"25px"} marginBottom={"5px"} textSize={"14px"}>
          (2) Subscribe to topic
        </Label>
        <form onSubmit={handleSubscribeToTopic}>
          <FormGroup>
            <Label>Topic</Label>
            <Input type="text" {...bindSubscriberTopic} />
          </FormGroup>
          <FormGroup>
            <Flex>
              <Button type="submit">Subscribe</Button>
            </Flex>
          </FormGroup>
        </form>
      </OptionRowContent>
    </FlexColumn>
  );
}
