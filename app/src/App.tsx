import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "./queries";
import SignInOrUp from "./pages/SignInOrUp";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  const { data, loading } = useQuery(GET_ME, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={data?.me ? <Home /> : <SignInOrUp />} />
    </Routes>
  );
}

export default App;
