import React from "react";
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useSignOut from "../../hooks/sign/useSignOut";

export default function SignOutButton() {
  const { handleSignOut } = useSignOut();

  return (
    <IconButton onClick={handleSignOut} color="inherit">
      <ExitToAppIcon fontSize="large" />
    </IconButton>
  );
}
