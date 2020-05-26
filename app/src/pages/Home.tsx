import React from "react";
import CreatePostForm from "./home/CreatePostForm";
import Feed from "./home/Feed";
import { Container, createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AvatarUpload from "../components/AvatarUpload";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

function Home() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <CreatePostForm />
      <Feed />
    </Container>
  );
}

export default Home;
