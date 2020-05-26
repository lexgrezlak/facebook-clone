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
import FriendList from "../components/friend/FriendList";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileFeed from "./profile/ProfileFeed";
import { makeStyles } from "@material-ui/core/styles";
import OwnAvatar from "./ownProfile/OwnAvatar";
import { UserPreviewAndPosts } from "../types";
import { StyledProfileAvatar } from "../styled/StyledProfileAvatar";

interface UserData {
  user: UserPreviewAndPosts;
}

interface UserVars {
  id: number;
}

interface Props {
  meId: number;
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

function Profile({ meId }: Props) {
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
      {meId === id ? (
        <OwnAvatar />
      ) : (
        <StyledProfileAvatar src={user.avatar} alt={fullName} />
      )}
      <Grid container spacing={2}>
        <ProfileHeader id={id} fullName={fullName} />
        <Grid item xs={12} md={4} className={classes.grid}>
          <FriendList id={id} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ProfileFeed user={user} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
