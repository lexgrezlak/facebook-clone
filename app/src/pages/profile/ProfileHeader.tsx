import React from "react";
import { createStyles, Theme, Typography } from "@material-ui/core";
import FriendButton from "../../components/friend/FriendButton";
import { GET_ME } from "../../queries";
import { useApolloClient } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  id: number;
  fullName: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      padding: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    grid: {
      borderColor: "red",
      borderStyle: "solid",
      borderWidth: "10px",
    },
  })
);

function ProfileHeader({ fullName, id }: Props) {
  const classes = useStyles();
  const client = useApolloClient();
  const meData = client.readQuery({ query: GET_ME });
  const { id: meId } = meData.me;

  return (
    <div className={classes.root}>
      <Typography variant="h2">{fullName}</Typography>
      {meId !== id && <FriendButton id={id} />}
    </div>
  );
}

export default ProfileHeader;
