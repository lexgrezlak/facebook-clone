import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "./queries";
import SignInOrUp from "./pages/SignInOrUp";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const { data, loading } = useQuery(GET_ME, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return null;

  if (!data?.me) return <SignInOrUp />;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
