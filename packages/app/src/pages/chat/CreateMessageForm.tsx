import React from "react";
import { Formik, Form } from "formik";
import MyTextField from "../../components/MyTextField";
import { Button } from "@material-ui/core";
import { useCreateMessageForm } from "../../hooks/chat/useCreateMessageForm";

interface Props {
  chatId: string;
}

export default function CreateMessageForm({ chatId }: Props) {
  const {
    handleCreateMessage,
    initialValues,
    validationSchema,
  } = useCreateMessageForm({ chatId });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreateMessage}
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
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
}
