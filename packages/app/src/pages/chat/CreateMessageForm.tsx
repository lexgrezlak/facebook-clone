import React from "react";
import { Formik, Form } from "formik";
import MyTextField from "../../components/MyTextField";
import { Button } from "@material-ui/core";
import { useCreateMessageFormManagement } from "../../hooks/chat/useCreateMessageFormManagement";

export default function CreateMessageForm({ chatId }) {
  const {
    handleCreateMessage,
    initialValues,
    validationSchema,
  } = useCreateMessageFormManagement({ chatId });

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
