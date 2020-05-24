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
  const me = client.readQuery({ query: GET_ME });
  console.log(me);
  return (
    <div>
      <Link to="/">Home</Link>
      <Typography>
        FN: {me.firstName} LN: {me.lastName}
      </Typography>
      <Search />
      <FriendInvitations />
      <SignOutButton />
    </div>
  );
}

export default Header;
