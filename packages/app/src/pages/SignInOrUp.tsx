import React, { useState } from "react";
import SignUpForm from "./signInOrOut/SignUpForm";
import SignInForm from "./signInOrOut/SignInForm";
import { Avatar, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function SignInOrUp() {
  const [visible, setVisible] = useState(false);
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {visible ? (
          <SignUpForm setVisible={setVisible} />
        ) : (
          <SignInForm setVisible={setVisible} />
        )}
      </div>
    </Container>
  );
}

export default SignInOrUp;
