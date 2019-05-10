/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import solace, { SessionEventCode, MessageDeliveryModeType } from "solclientjs";
var factoryProps = new solace.SolclientFactoryProperties();
factoryProps.profile = solace.SolclientFactoryProfiles.version10;
const solaceModule = solace.SolclientFactory.init(factoryProps);

/**
 * Solace Systems Node.js API
 * Publish/Subscribe tutorial - Topic Publisher
 * Demonstrates publishing direct messages to a topic
 */

/*jslint es6 node:true devel:true*/

export function TopicPublisher(logger) {
  "use strict";
  var solace = solaceModule;
  var publisher = {};
  publisher.session = null;

  // Logger
  publisher.log = function(line) {
    logger(line);
  };

  // main function
  publisher.run = function(hostUrl, vpnName, userName, password) {
    publisher.connect(hostUrl, vpnName, userName, password);
  };

  // Establishes connection to Solace message router
  publisher.connect = function(hostUrl, vpnName, userName, password) {
    if (publisher.session !== null) {
      publisher.log(
        `Publisher connected to ${hostUrl} is already connected and ready to publish.`
      );
      return;
    }
    // create session
    try {
      publisher.session = solace.createSession({
        // solace.SessionProperties
        url: hostUrl,
        vpnName: vpnName,
        userName: userName,
        password: password
      });
    } catch (error) {
      publisher.log(error.toString());
    }
    // define session event listeners
    publisher.session.on(SessionEventCode.UP_NOTICE, function(sessionEvent) {
      publisher.log(`Publisher connected to ${hostUrl}`);
    });
    publisher.session.on(SessionEventCode.CONNECT_FAILED_ERROR, function(
      sessionEvent
    ) {
      publisher.log(
        "Connection failed to the message router: " +
          sessionEvent.infoStr +
          " - check correct parameter values and connectivity!"
      );
    });
    publisher.session.on(SessionEventCode.DISCONNECTED, function(sessionEvent) {
      publisher.log(`Disconnected from ${hostUrl}`);
      if (publisher.session !== null) {
        publisher.session.dispose();
        publisher.session = null;
      }
    });
    // connect the session
    try {
      publisher.session.connect();
    } catch (error) {
      publisher.log(error.toString());
    }
  };

  // Publishes one message
  publisher.publish = (topicName, messageText) => {
    if (publisher.session !== null) {
      // sanitize / reduce message here
      var message = solace.createMessage();
      message.setDestination(solace.createTopicDestination(topicName));
      message.setBinaryAttachment(messageText);
      message.setDeliveryMode(MessageDeliveryModeType.DIRECT);
      message.setSenderTimestamp(Date.now());
      publisher.log(
        `Publisher ${
          publisher.session.getSessionProperties().url
        }: publishing message "${messageText}" to topic "${topicName}"...`
      );
      try {
        publisher.session.send(message);
        publisher.log(
          `Publisher ${
            publisher.session.getSessionProperties().url
          }: successfully published "${messageText}" to topic "${topicName}"`
        );
      } catch (error) {
        publisher.log(error.toString());
      }
    } else {
      publisher.log(
        "Cannot publish because not connected to Solace message router."
      );
    }
  };

  publisher.exit = function() {
    publisher.disconnect();
    setTimeout(function() {
      process.exit();
    }, 1000); // wait for 1 second to finish
  };

  // Gracefully disconnects from Solace message router
  publisher.disconnect = function() {
    publisher.log("Disconnecting from Solace message router...");
    if (publisher.session !== null) {
      try {
        publisher.session.disconnect();
      } catch (error) {
        publisher.log(error.toString());
      }
    } else {
      publisher.log("Not connected to Solace message router.");
    }
  };

  return publisher;
}

/**
 * Solace Systems Node.js API
 * Publish/Subscribe tutorial - Topic Subscriber
 * Demonstrates subscribing to a topic for direct messages and receiving messages
 */

/*jslint es6 node:true devel:true*/

export function TopicSubscriber(logger) {
  var solace = solaceModule;
  var subscriber = {};
  subscriber.session = null;
  subscriber.subscribed = false;

  // Logger
  subscriber.log = function(line) {
    logger(line);
  };

  // main function
  subscriber.run = function(hostUrl, vpnName, userName, password) {
    subscriber.connect(hostUrl, vpnName, userName, password);
  };

  // Establishes connection to Solace message router
  subscriber.connect = function(hostUrl, vpnName, userName, password) {
    if (subscriber.session !== null) {
      subscriber.log(
        `Subscriber connected to ${hostUrl} is already connected and ready to receive messages.`
      );
      return;
    }
    // create session
    try {
      subscriber.session = solace.createSession({
        // solace.SessionProperties
        url: hostUrl,
        vpnName: vpnName,
        userName: userName,
        password: password,
        generateReceiveTimestamps: true
      });
    } catch (error) {
      subscriber.log(error.toString());
    }
    // define session event listeners
    subscriber.session.on(SessionEventCode.UP_NOTICE, function(sessionEvent) {
      subscriber.log(`Subscriber connected to ${hostUrl}`);
    });
    subscriber.session.on(SessionEventCode.CONNECT_FAILED_ERROR, function(
      sessionEvent
    ) {
      subscriber.log(
        "Connection failed to the message router: " +
          sessionEvent.infoStr +
          " - check correct parameter values and connectivity!"
      );
    });
    subscriber.session.on(SessionEventCode.DISCONNECTED, function(
      sessionEvent
    ) {
      subscriber.log("Disconnected.");
      subscriber.subscribed = false;
      if (subscriber.session !== null) {
        subscriber.session.dispose();
        subscriber.session = null;
      }
    });
    subscriber.session.on(SessionEventCode.SUBSCRIPTION_ERROR, function(
      sessionEvent
    ) {
      subscriber.log(
        "Cannot subscribe to topic: " + sessionEvent.correlationKey
      );
    });
    subscriber.session.on(SessionEventCode.SUBSCRIPTION_OK, function(
      sessionEvent
    ) {
      if (subscriber.subscribed) {
        subscriber.subscribed = false;
        subscriber.log(
          "Successfully unsubscribed from topic: " + sessionEvent.correlationKey
        );
      } else {
        subscriber.subscribed = true;
        subscriber.log(
          `Subscriber ${hostUrl}: successfully subscribed to topic "${
            sessionEvent.correlationKey
          }"`
        );
      }
    });
    // define message event listener
    subscriber.session.on(SessionEventCode.MESSAGE, function(message) {
      console.log(message);
      subscriber.log(
        `Subscriber ${hostUrl}: received message ${message.getBinaryAttachment()}`
      );
      onMessageReceived(message);
    });
    // connect the session
    try {
      subscriber.session.connect();
    } catch (error) {
      subscriber.log(error.toString());
    }
  };

  // Subscribes to topic on Solace message router
  subscriber.subscribe = function(topicName) {
    if (subscriber.session !== null) {
      if (subscriber.subscribed) {
        subscriber.log(
          `Subscriber ${hostUrl}: already subscribed to a topic and ready to receive messages.`
        );
      } else {
        try {
          subscriber.session.subscribe(
            solace.createTopicDestination(topicName),
            true, // generate confirmation when subscription is added successfully
            topicName, // use topic name as correlation key
            10000 // 10 seconds timeout for this operation
          );
        } catch (error) {
          subscriber.log(error.toString());
        }
      }
    } else {
      subscriber.log(
        `Subscriber ${hostUrl}: cannot subscribe because not connected to Solace message router.`
      );
    }
  };

  subscriber.exit = function() {
    subscriber.unsubscribe();
    subscriber.disconnect();
    setTimeout(function() {
      process.exit();
    }, 1000); // wait for 1 second to finish
  };

  // Unsubscribes from topic on Solace message router
  subscriber.unsubscribe = function(topicName) {
    if (subscriber.session !== null) {
      if (subscriber.subscribed) {
        subscriber.log("Unsubscribing from topic: " + topicName);
        try {
          subscriber.session.unsubscribe(
            solace.SolclientFactory.createTopicDestination(topicName),
            true, // generate confirmation when subscription is removed successfully
            topicName, // use topic name as correlation key
            10000 // 10 seconds timeout for this operation
          );
        } catch (error) {
          subscriber.log(error.toString());
        }
      } else {
        subscriber.log(
          'Cannot unsubscribe because not subscribed to the topic "' +
            topicName +
            '"'
        );
      }
    } else {
      subscriber.log(
        "Cannot unsubscribe because not connected to Solace message router."
      );
    }
  };

  // Gracefully disconnects from Solace message router
  subscriber.disconnect = function() {
    subscriber.log(
      `Subscriber ${
        subscriber.session.getSessionProperties().url
      }: disconnecting from Solace message router...`
    );
    if (subscriber.session !== null) {
      try {
        subscriber.session.disconnect();
      } catch (error) {
        subscriber.log(error.toString());
      }
    } else {
      subscriber.log("Not connected to Solace message router.");
    }
  };

  return subscriber;
}
