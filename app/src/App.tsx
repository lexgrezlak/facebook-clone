import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "./queries";
import SignInOrUp from "./pages/SignInOrUp";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import { Container } from "@material-ui/core";

interface Me {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface MeData {
  me: Me;
}

function App() {
  const { data, loading } = useQuery<MeData>(GET_ME, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return null;

  if (!data?.me) return <SignInOrUp />;

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
