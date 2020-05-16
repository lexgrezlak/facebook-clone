import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "./queries";

function App() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  if (loading) return null;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return <div>{JSON.stringify(data)}</div>;
}

export default App;
