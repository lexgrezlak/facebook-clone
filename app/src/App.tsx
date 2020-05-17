import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "./queries";
import SignUpForm from "./SignUpForm";

function App() {
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  if (loading) return null;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div>
      <SignUpForm />
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
