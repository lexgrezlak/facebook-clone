import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../graphql/queries";
import { CommentsData } from "../../../types";
import MyTextField from "../../MyTextField";
import { Formik, Form } from "formik";
import { Button, CircularProgress } from "@material-ui/core";
import { useCreateComment } from "../../../hooks/post/useCreateComment";
import CommentList from "./CommentList";

interface Props {
  postId: string;
}

interface CommentsVars {
  postId: string;
}

export default function Comments({ postId }: Props) {
  const { data } = useQuery<CommentsData, CommentsVars>(GET_COMMENTS, {
    variables: { postId },
  });

  const {
    handleCreateComment,
    initialValues,
    validationSchema,
  } = useCreateComment({ postId });

  return (
    <div>
      <CommentList comments={data?.comments} postId={postId} />
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
    </div>
  );
}
