import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  const authorization = token ? `Bearer ${token}` : "";

  return {
    headers: {
      ...headers,
      authorization,
    },
  };
});

const httpLink = createHttpLink({ uri: "/graphql" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
