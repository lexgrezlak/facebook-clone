import React from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default Profile;
