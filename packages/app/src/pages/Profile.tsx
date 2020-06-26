import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import {
  CircularProgress,
  Container,
  createStyles,
  Grid,
} from "@material-ui/core";
import ProfileHeader from "./profile/Header";
import Posts from "./profile/header/Posts";
import { makeStyles } from "@material-ui/core/styles";
import { UserData, UserVars } from "../types";
import Friends from "./profile/Friends";

const useStyles = makeStyles(() =>
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
  const { id } = useParams();

  const { data, loading } = useQuery<UserData, UserVars>(GET_USER, {
    variables: { id },
  });

  // loading so that it doesn't use the old data in the cache, that is previous user's id
  if (!data || loading) return <CircularProgress />;

  return (
    <Container maxWidth="md" component="main" className={classes.root}>
      <ProfileHeader />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} className={classes.grid}>
          <Friends />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Posts user={data.user} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
