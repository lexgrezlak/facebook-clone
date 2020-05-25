import React from "react";
import CreatePostForm from "./home/CreatePostForm";
import Feed from "./home/Feed";
import FriendList from "../components/FriendList";

function Home() {
  return (
    <div>
      <CreatePostForm />
      <Feed />
      <FriendList />
    </div>
  );
}

export default Home;
