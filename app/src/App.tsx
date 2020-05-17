import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "./queries";
import SignInOrUp from "./SignInOrUp";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: "network-only",
  });

  if (loading) return null;
  if (error) return <div>{JSON.stringify(error.graphQLErrors[0].message)}</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={data?.me ? <Home /> : <SignInOrUp />} />
      </Routes>
      {JSON.stringify(data)}
    </BrowserRouter>
  );
}

export default App;
