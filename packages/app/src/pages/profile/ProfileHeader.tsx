import React from "react";
import { createStyles, Theme, Typography } from "@material-ui/core";
import FriendButton from "../../components/friend/FriendButton";
import { makeStyles } from "@material-ui/core/styles";
import OwnAvatar from "../ownProfile/OwnAvatar";
import OwnBackground from "../ownProfile/OwnBackground";
import { StyledProfileAvatar } from "../../styled/StyledProfileAvatar";
import { UserPreviewAndPosts } from "../../types";
import OwnMenu from "../ownProfile/OwnMenu";

interface Props {
  user: UserPreviewAndPosts;
  meId: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      width: "100%",
      padding: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    grid: {
      borderColor: "red",
      borderStyle: "solid",
      borderWidth: "10px",
    },
    images: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      alignSelf: "flex-start",
      width: "100%",
      position: "relative",
    },
    name: {
      width: "100%",
    },
  })
);

const ProfileHeader = ({ user, meId }: Props) => {
  const { firstName, lastName, id, background, avatar } = user;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <OwnBackground background={background} />
      {meId === id ? (
        <div className={classes.images}>
          <OwnAvatar />
        </div>
      ) : (
        <StyledProfileAvatar src={avatar} alt={"Avatar"} />
      )}
      <div className={classes.name}>
        <Typography align="center" variant="h2">
          {firstName} {lastName}
        </Typography>
      </div>
      <OwnMenu />
      {meId !== id && <FriendButton id={id} />}
    </div>
  );
};

export default ProfileHeader;
