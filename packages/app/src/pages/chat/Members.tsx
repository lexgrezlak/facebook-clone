import React from "react";
import { UserPreview } from "../../types";
import { Link } from "react-router-dom";
import {
  Typography,
  Avatar,
  makeStyles,
  createStyles,
} from "@material-ui/core";

interface Props {
  users: UserPreview[];
}

const useStyles = makeStyles(() =>
  createStyles({
    userInfo: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "inherit",
      "&:visited": {
        color: "inherit",
      },
    },
  })
);

export default function Members({ users }: Props) {
  const classes = useStyles();

  return (
    <div>
      {users.map((user) => (
        <Link
          to={`/users/${user.id}`}
          className={classes.userInfo}
          key={user.id}
        >
          <Avatar src={user.avatar} />
          <Typography variant="h5">{user.fullName}</Typography>
        </Link>
      ))}
    </div>
  );
}
