import React from "react";
import { GET_ME } from "../../graphql/queries";
import { useApolloClient } from "@apollo/client";
import { Badge, createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AvatarUpload from "../../components/AvatarUpload";
import { StyledProfileAvatar } from "../../styled/StyledProfileAvatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
      zIndex: 999,
    },

    badge: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  })
);

function OwnAvatar() {
  const classes = useStyles();
  const client = useApolloClient();
  const data = client.readQuery({ query: GET_ME });
  const { avatar } = data.me;

  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={<AvatarUpload />}
        className={classes.badge}
      >
        <StyledProfileAvatar alt="Your avatar" src={avatar} />
      </Badge>
    </div>
  );
}

export default OwnAvatar;
