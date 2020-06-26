import React from "react";
import { Badge, createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AvatarUpload from "../AvatarUpload";
import { useMe } from "../../../../hooks/useMe";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  })
);

interface Props {
  children: React.ReactElement;
}

function EditWrapper({ children }: Props) {
  const classes = useStyles();
  const me = useMe();
  const { id } = useParams();

  const isMyProfile = me.id === id;

  return isMyProfile ? (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={<AvatarUpload />}
      className={classes.badge}
    >
      {children}
    </Badge>
  ) : (
    children
  );
}

export default EditWrapper;
