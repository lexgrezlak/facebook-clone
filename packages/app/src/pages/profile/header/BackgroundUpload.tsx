import { createStyles, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useUpdateBackground } from "../../../hooks/upload/useUpdateBackground";

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      display: "none",
    },
    icon: {
      cursor: "pointer",
      color: "black",
    },
  })
);

function BackgroundUpload() {
  const classes = useStyles();
  const { handleUpdateBackground, loading } = useUpdateBackground();

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
        <Button variant="contained" component="span" disabled={loading}>
          Edit background
        </Button>
      </label>
    </div>
  );
}

export default BackgroundUpload;
