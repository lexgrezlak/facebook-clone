import React from "react";
import Search from "./header/Search";
import SignOutButton from "../pages/home/SignOutButton";
import FriendInvitations from "./FriendInvitations";
import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { Typography } from "@material-ui/core";
import { GET_ME } from "../queries";

function Header() {
  const client = useApolloClient();
  const data = client.readQuery({ query: GET_ME });
  const { firstName, lastName } = data.me;
  return (
    <div>
      <Link to="/">Home</Link>
      <Typography>
        FN: {firstName} LN: {lastName}
      </Typography>
      <Search />
      <FriendInvitations />
      <SignOutButton />
    </div>
  );
}

export default Header;
