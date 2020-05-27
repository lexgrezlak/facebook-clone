import React from "react";
import CreatePostForm from "./home/CreatePostForm";
import Feed from "./home/Feed";
import {
  Button,
  Container,
  createStyles,
  IconButton,
  Popover,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import FriendRequestList from "../components/friend/FriendRequestList";

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
