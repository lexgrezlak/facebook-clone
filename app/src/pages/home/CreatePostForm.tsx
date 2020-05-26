import React from "react";
import { useApolloClient } from "@apollo/client";
import { GET_ME } from "../../queries";
import { Button, createStyles, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomAvatar from "../../components/CustomAvatar";
import { useCreatePostFormManagement } from "../../hooks/useCreatePostFormManagement";
import MyTextField from "../../components/MyTextField";
import { Form, Formik } from "formik";
import CustomPaper from "../../components/CustomPaper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    flex: {
      display: "flex",
      alignItems: "center",
    },
    button: {
      margin: theme.spacing(2, 0, 1),
    },
  })
);

function CreatePostForm() {
  const classes = useStyles();

  const client = useApolloClient();
  const data = client.readQuery({ query: GET_ME });
  const { firstName, lastName, avatar, id } = data.me;

  const {
    handleCreatePost,
    initialValues,
    validationSchema,
  } = useCreatePostFormManagement({ firstName, lastName });

  return (
    <CustomPaper>
      <div className={classes.wrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleCreatePost}
          validationSchema={validationSchema}
        >
          {() => (
            <Form noValidate className={classes.form}>
              <div className={classes.flex}>
                <CustomAvatar
                  src={avatar}
                  id={id}
                  alt={`${firstName} ${lastName}`}
                />
                <MyTextField
                  type="text"
                  name="content"
                  rows={2}
                  multiline
                  placeholder={`What's on your mind, ${firstName}?`}
                  autoComplete="off"
                  margin="none"
                />
              </div>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                className={classes.button}
              >
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </CustomPaper>
  );
}

export default CreatePostForm;
