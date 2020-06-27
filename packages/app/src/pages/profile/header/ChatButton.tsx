import React from "react";
import { Button, makeStyles, Theme, createStyles } from "@material-ui/core";
import { useCreateChat } from "../../../hooks/chat/useCreateChat";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

export default function ChatButton() {
  const classes = useStyles();
  const { id: userId } = useParams();
  const { handleCreateChat } = useCreateChat({ userId });

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={handleCreateChat}>
        Message
      </Button>
    </div>
  );
}
