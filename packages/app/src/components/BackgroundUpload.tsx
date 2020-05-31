import {
  CircularProgress,
  createStyles,
  IconButton,
  Theme,
} from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useUpdateBackgroundManagement } from "../hooks/useUpdateBackgroundManagement";

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

function BackgroundUpload(): JSX.Element {
  const classes = useStyles();
  const { handleUpdateBackground, loading } = useUpdateBackgroundManagement();

  if (loading) return <CircularProgress className={classes.button} />;

  return (
    <div>
      <input
        id="background-upload"
        accept="image/*"
        type="file"
        onChange={handleUpdateBackground}
        className={classes.input}
      />
      <label htmlFor="background-upload">
        <IconButton component="span" className={classes.button}>
          <AddAPhotoIcon className={classes.icon} />
        </IconButton>
      </label>
    </div>
  );
}

export default BackgroundUpload;
