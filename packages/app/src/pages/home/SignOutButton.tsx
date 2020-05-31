import React from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { SIGN_OUT } from "../../graphql/mutations";

function SignOutButton() {
  const client = useApolloClient();
  const [signOut] = useMutation(SIGN_OUT, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const navigate = useNavigate();

  async function handleSignOut() {
    navigate("/");
    await signOut();
    await client.resetStore();
  }

  return <button onClick={handleSignOut}>Sign out</button>;
}

export default SignOutButton;
