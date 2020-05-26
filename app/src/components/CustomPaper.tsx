import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

interface Props {
  children: React.ReactNode;
}

function CustomPaper({ children }: Props) {
  const classes = useStyles();

  return <Paper className={classes.paper}>{children}</Paper>;
}

export default CustomPaper;
