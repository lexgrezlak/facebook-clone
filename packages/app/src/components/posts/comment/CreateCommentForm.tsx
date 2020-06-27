import React from "react";
import { useCreateCommentForm } from "../../../hooks/post/comment/useCreateCommentForm";
import { Formik, Form } from "formik";
import MyTextField from "../../MyTextField";
import { Button } from "@material-ui/core";

interface Props {
  postId: string;
}

export default function CreateCommentForm({ postId }: Props) {
  const {
    handleCreateComment,
    initialValues,
    validationSchema,
  } = useCreateCommentForm({ postId });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreateComment}
      validationSchema={validationSchema}
    >
      {() => (
        <Form noValidate>
          <div>
            <MyTextField
              type="text"
              name="content"
              autoComplete="off"
              margin="none"
            />
          </div>
          <Button variant="contained" type="submit" fullWidth>
            Comment
          </Button>
        </Form>
      )}
    </Formik>
  );
}
