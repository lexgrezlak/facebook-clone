import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "./graphql/queries";
import SignInOrUp from "./pages/Sign";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import Profile from "./pages/Profile";
import { MeData } from "./types";
import Chat from "./pages/Chat";

const App: React.FC = () => {
  const { data, loading } = useQuery<MeData>(GET_ME, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) return null;

  if (!data?.me) return <SignInOrUp />;

  return (
    <div>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/:id" element={<Profile />} />
        <Route path="chats/:id" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
