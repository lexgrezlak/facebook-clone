import React from "react";
import CreatePostForm from "./home/CreatePostForm";
import Feed from "./home/Feed";
import SignOutButton from "./home/SignOutButton";

function Home() {
  return (
    <div>
      <SignOutButton />
      <CreatePostForm />
      <Feed />
    </div>
  );
}

export default Home;
