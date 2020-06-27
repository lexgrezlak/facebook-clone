import React from "react";
import {
  CircularProgress,
  Container,
  createStyles,
  Grid,
} from "@material-ui/core";
import ProfileHeader from "./profile/Header";
import Posts from "./profile/Posts";
import { makeStyles } from "@material-ui/core/styles";
import Friends from "./profile/Friends";
import { useProfile } from "../hooks/useProfile";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

function Profile() {
  const classes = useStyles();
  const { user } = useProfile();

  // load the profile before displaying anything
  if (!user) return <CircularProgress />;

  return (
    <Container maxWidth="md" component="main" className={classes.root}>
      <ProfileHeader />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} className={classes.grid}>
          <Friends />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Posts />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
