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
import FriendList from "../components/appHeader/friendRequests/FriendList";
import ProfileHeader from "./profile/Header";
import Posts from "./profile/header/Posts";
import { makeStyles } from "@material-ui/core/styles";
import { UserData, UserVars } from "../types";

interface Props {
  meId: string;
}

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

function Profile({ meId }: Props) {
  const classes = useStyles();
  const { id } = useParams();

  const { data } = useQuery<UserData, UserVars>(GET_USER, {
    variables: { id },
  });

  if (!data?.user) return <CircularProgress />;

  const { user } = data;

  return (
    <Container maxWidth="md" component="main" className={classes.root}>
      <ProfileHeader user={user} meId={meId} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} className={classes.grid}>
          <FriendList />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Posts user={user} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
