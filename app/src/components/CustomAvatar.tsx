import React from "react";
import { Link } from "react-router-dom";
import { Avatar, createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  id: number;
  alt: string;
  src?: string; // otherwise there will be a default picture
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  })
);

function CustomAvatar({ id, src, alt }: Props) {
  const classes = useStyles();

  return (
    <Link to={`/users/${id}`}>
      <Avatar src={src} alt={alt} className={classes.avatar} />
    </Link>
  );
}

export default CustomAvatar;
