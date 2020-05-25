import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createUploadLink } from "apollo-upload-client";

// const httpLink = createHttpLink({
//   uri: "/graphql",
//   credentials: "same-origin",
// });

const uploadLink = createUploadLink({
  uri: "/graphql",
  credentials: "same-origin",
}) as any;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
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
