import React from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { SIGN_OUT } from "../../graphql/mutations";
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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

  return (
    <IconButton onClick={handleSignOut} color="inherit">
      <ExitToAppIcon fontSize="large" />
    </IconButton>
  );
}

export default SignOutButton;
