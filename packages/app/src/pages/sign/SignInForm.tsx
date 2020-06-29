import React, { Dispatch } from "react";
import { Form, Formik } from "formik";
import { useSignInFormManagement } from "../../hooks/sign/useSignInFormManagement";
import { Button, Grid, Link } from "@material-ui/core";
import MyTextField from "../../components/MyTextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface Props {
  setVisible: Dispatch<React.SetStateAction<boolean>>;
}

function SignInForm({ setVisible }: Props) {
  const classes = useStyles();
  const {
    handleSubmit,
    initialValues,
    validationSchema,
  } = useSignInFormManagement();

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form noValidate className={classes.form}>
            <MyTextField
              name="email"
              type="email"
              label="Email address"
              autoFocus
            />
            <MyTextField name="password" type="password" label="Password" />
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
              fullWidth
              className={classes.submit}
              disabled={isSubmitting}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  href="#"
                  onClick={() =>
                    handleSubmit({
                      email: "demo999@demo.demo",
                      password: "demo999",
                    })
                  }
                >
                  Demo sign in
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" href="#" onClick={() => setVisible(true)}>
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignInForm;
