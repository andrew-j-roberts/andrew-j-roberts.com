// currently maps to https://docs.solace.com/API-Developer-Online-Ref-Documentation/swagger-ui/index.html#/dmrCluster/

import { useState } from "react";
import { makeRequest } from "./HttpClient";

export class SEMP {
  basicAuthUsername;
  basicAuthPassword;

  constructor(basicAuthUsername, basicAuthPassword) {
    this.basicAuthUsername = basicAuthUsername;
    this.basicAuthPassword = basicAuthPassword;
  }

  async getDmrClusters(ipAddress) {
    const url = `http://${ipAddress}:8080/SEMP/v2/config`;
    const params = {
      baseUrl: url,
      endpoint: "/dmrClusters",
      method: "GET",
      basicAuthUsername: this.basicAuthUsername,
      basicAuthPassword: this.basicAuthPassword
    };
    try {
      let res = await makeRequest(params);
      let dmrClusterList = res["data"]["data"];
      return dmrClusterList;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getDmrClusterLinks(ipAddress, dmrClusterName) {
    const url = `http://${ipAddress}:8080/SEMP/v2/config`;
    const params = {
      baseUrl: url,
      endpoint: `/dmrClusters/${encodeURIComponent(dmrClusterName)}/links`,
      method: "GET",
      basicAuthUsername: this.basicAuthUsername,
      basicAuthPassword: this.basicAuthPassword
    };
    try {
      let res = await makeRequest(params);
      let linksList = res["data"]["data"];
      return linksList;
    } catch (err) {
      return new Error(err);
    }
  }

  async getRemoteAddresses(ipAddress, dmrClusterName, remoteNodeName) {
    const url = `http://${ipAddress}:8080/SEMP/v2/config`;
    const params = {
      baseUrl: url,
      endpoint: `/dmrClusters/${dmrClusterName}/links/${encodeURIComponent(
        remoteNodeName
      )}/remoteAddresses`,
      method: "GET",
      basicAuthUsername: this.basicAuthUsername,
      basicAuthPassword: this.basicAuthPassword
    };
    try {
      let res = await makeRequest(params);
      let remoteAddresses = res["data"]["data"];
      return remoteAddresses;
    } catch (err) {
      return new Error(err);
    }
  }

  // use msgVpn client connections to get IPs for nodes with no remote address
  async getClientConnection(ipAddress, dmrClusterName) {
    const url = `http://${ipAddress}:8080/SEMP/v2/monitor`;
    const params = {
      baseUrl: url,
      endpoint: `/msgVpns/default/clients`,
      method: "GET",
      basicAuthUsername: this.basicAuthUsername,
      basicAuthPassword: this.basicAuthPassword
    };
    try {
      const res = await makeRequest(params);
      const clientLinks = res["data"]["links"];
      for (const link of clientLinks) {
        if (
          link["connectionsUri"].includes(encodeURIComponent(dmrClusterName))
        ) {
          const clientAddress = await this.getClientAddress(
            link["connectionsUri"]
          );
          return clientAddress;
        }
      }
    } catch (err) {
      return new Error(err);
    }
  }

  // use msgVpn client connections to get IPs for nodes with no remote address
  async getClientAddress(uri) {
    const url = uri;
    const params = {
      baseUrl: url,
      endpoint: "",
      method: "GET",
      basicAuthUsername: this.basicAuthUsername,
      basicAuthPassword: this.basicAuthPassword
    };
    try {
      let res = await makeRequest(params);
      let clientAddress = res["data"]["data"][0]["clientAddress"].split(":")[0]; // gross
      return clientAddress;
    } catch (err) {
      return new Error(err);
    }
  }
}

export async function discoverMesh(
  client,
  ipAddress,
  knownNodeList,
  knownLinkList
) {
  let nodeList = knownNodeList;
  let linkList = knownLinkList; // key="ip1,ip2", stored it this way because "ip1,ip2" != "ip2,ip1"
  try {
    const clusters = await client.getDmrClusters(ipAddress);
    if (clusters instanceof Error) {
      throw clusters;
    }
    if (!nodeList[ipAddress]) {
      nodeList[ipAddress] = {
        ip: ipAddress,
        name: clusters[0]["nodeName"],
        clusterData: clusters,
        subscriberClient: null,
        publisherClient: null
      };
      if (clusters.length > 0) {
        for (let cluster of clusters) {
          const links = await client.getDmrClusterLinks(
            ipAddress,
            cluster["dmrClusterName"]
          );
          if (links.length > 0) {
            for (let link of links) {
              const remoteAddresses = await client.getRemoteAddresses(
                ipAddress,
                cluster["dmrClusterName"],
                link["remoteNodeName"]
              );
              // get client ip address
              let clientIpAddress;
              if (remoteAddresses.length > 0) {
                for (let remoteAddress of remoteAddresses) {
                  clientIpAddress = remoteAddress["remoteAddress"];
                  let linkTuple = [ipAddress, clientIpAddress].join(",");
                  linkList[linkTuple] = link;
                }
              } else {
                clientIpAddress = await client.getClientConnection(
                  ipAddress,
                  cluster["dmrClusterName"]
                );
                let linkTuple = [ipAddress, clientIpAddress].join(",");
                linkList[linkTuple] = link;
              }
              const res = await discoverMesh(
                client,
                clientIpAddress,
                nodeList,
                linkList
              );
              nodeList = { ...nodeList, ...res["nodes"] };
              linkList = { ...linkList, ...res["links"] };
            }
          }
        }
      }
      return { nodes: nodeList, links: linkList };
    } else {
      return { nodes: nodeList, links: linkList };
    }
  } catch (err) {
    return { nodes: [], links: [] };
  }
}
