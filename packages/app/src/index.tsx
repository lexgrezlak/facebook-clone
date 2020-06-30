import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/link-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const uploadLink = createUploadLink({
  uri: "/graphql",
  credentials: "same-origin",
}) as any;

const wsLink = new WebSocketLink({
  uri:
    // for dev purposes
    window.location.port === "3000"
      ? "ws://localhost:4000/graphql"
      : `ws://${window.location.host}/graphql`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  uploadLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
