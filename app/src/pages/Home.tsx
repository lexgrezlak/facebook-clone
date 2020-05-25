import React from "react";
import CreatePostForm from "./home/CreatePostForm";
import Feed from "./home/Feed";
import { Container, createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UploadInput from "../components/UploadInput";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

function Home() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <UploadInput />
      <CreatePostForm />
      <Feed />
    </Container>
  );
}

export default Home;
