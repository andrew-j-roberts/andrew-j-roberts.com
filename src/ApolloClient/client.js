import ApolloClient from "apollo-boost"

export const client = new ApolloClient({
  uri: "https://ci0ik59twl.execute-api.us-east-1.amazonaws.com/dev/graphql"
})