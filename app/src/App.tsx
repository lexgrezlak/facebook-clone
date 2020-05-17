import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_ME } from "./queries";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

function App() {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) return null;
  if (error) return <div>{JSON.stringify(error.graphQLErrors[0].message)}</div>;

  return (
    <div>
      <SignInForm />
      <SignUpForm />
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
