import React from "react";
import Search from "./header/Search";
import SignOutButton from "../pages/home/SignOutButton";
import FriendInvitations from "./FriendInvitations";

function Header() {
  return (
    <div>
      <Search />
      <FriendInvitations />
      <SignOutButton />
    </div>
  );
}

export default Header;
