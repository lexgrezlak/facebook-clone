import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
const cache = new InMemoryCache();
const link = createHttpLink({ uri: "/graphql", credentials: "same-origin" });

const client = new ApolloClient({
  cache,
  link,
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
