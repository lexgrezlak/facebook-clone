import React from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { GET_ME, SIGN_OUT } from "../../queries";

function SignOutButton() {
  const client = useApolloClient();
  const [signOut] = useMutation(SIGN_OUT, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleSignOut() {
    await signOut();
    client.writeQuery({
      query: GET_ME,
      data: {
        me: null,
      },
    });
  }

  return <button onClick={handleSignOut}>Sign out</button>;
}

export default SignOutButton;
