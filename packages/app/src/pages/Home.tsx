import React from "react";
import CreatePostForm from "./home/CreatePostForm";
import { Container, createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Posts from "../components/Posts";

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
      <Posts />
    </Container>
  );
}

export default Home;
