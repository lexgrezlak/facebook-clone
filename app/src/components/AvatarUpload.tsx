import React from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  createStyles,
  IconButton,
  Theme,
} from "@material-ui/core";
import { useAvatarUploadManagement } from "../hooks/useAvatarUploadManagement";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: "none",
    },
    icon: {
      cursor: "pointer",
      color: "black",
    },
    button: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      backgroundColor: "#f0f0f0",
      borderRadius: "50%",
      "&:hover": {
        backgroundColor: "#d0d0d0",
      },
    },
  })
);

function AvatarUpload() {
  const classes = useStyles();
  const { handleAvatarUpdate, loading } = useAvatarUploadManagement();

  if (loading) return <CircularProgress className={classes.button} />;

  return (
    <div>
      <input
        id="avatar-upload"
        accept="image/*"
        type="file"
        onChange={handleAvatarUpdate}
        className={classes.input}
      />
      <label htmlFor="avatar-upload">
        <IconButton component="span" className={classes.button}>
          <AddAPhotoIcon className={classes.icon} />
        </IconButton>
      </label>
    </div>
  );
}

export default AvatarUpload;
