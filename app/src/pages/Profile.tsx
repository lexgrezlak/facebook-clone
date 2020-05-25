import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries";
import {
  CircularProgress,
  Container,
  createStyles,
  Grid,
  Theme,
} from "@material-ui/core";
import PostItem from "../components/PostItem";
import { Author } from "../types";
import FriendList from "../components/FriendList";
import Header from "./profile/Header";
import Feed from "./profile/Feed";
import { makeStyles } from "@material-ui/core/styles";

export interface Post {
  id: number;
  content: string;
  createdAt: Date;
  author: Author;
}

interface User {
  firstName: string;
  lastName: string;
  posts: Post[];
}

interface UserData {
  user: User;
}

interface UserVars {
  id: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grid: {
      borderColor: "red",
      borderStyle: "solid",
      borderWidth: "10px",
    },
  })
);

function Profile() {
  const classes = useStyles();
  const { id: stringId } = useParams();
  const id = Number(stringId);

  const { data } = useQuery<UserData, UserVars>(GET_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    variables: { id },
  });

  if (!data?.user) return <CircularProgress />;

  const { user } = data;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Container maxWidth="md" component="main" className={classes.root}>
      <Grid container spacing={2}>
        <Header id={id} fullName={fullName} />
        <Grid item xs={12} md={4} className={classes.grid}>
          <FriendList id={id} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Feed posts={user.posts} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
