import React from "react";
import { Form, Formik } from "formik";
import DateField from "./DateField";
import RadioField from "./RadioField";
import { useSignUpFormManagement } from "../../hooks/useSignUpFormManagement";
import { Button, Grid, Link } from "@material-ui/core";
import MyTextField from "../../components/MyTextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUpForm({ setVisible }: any) {
  const classes = useStyles();
  const {
    handleSubmit,
    initialValues,
    validationSchema,
  } = useSignUpFormManagement();

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form noValidate className={classes.form}>
            <MyTextField
              name="firstName"
              type="text"
              label="First name"
              autoFocus
            />
            <MyTextField name="lastName" type="text" label="Last name" />
            <MyTextField name="email" type="email" label="Email address" />
            <MyTextField
              name="password"
              type="password"
              label="Password"
              autoFocus
            />
            <MyTextField
              name="passwordConfirm"
              type="password"
              label="Confirm password"
            />
            <DateField name="birthday" />
            <RadioField name="gender" />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              className={classes.submit}
              fullWidth
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  href="#"
                  onClick={() => setVisible(false)}
                >
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SignUpForm;
