import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
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

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
