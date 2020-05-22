import React from "react";
import Search from "./header/Search";
import SignOutButton from "../pages/home/SignOutButton";
import FriendInvitations from "./FriendInvitations";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Search />
      <FriendInvitations />
      <SignOutButton />
    </div>
  );
}

export default Header;
