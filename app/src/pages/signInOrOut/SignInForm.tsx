import React from "react";
import { Field, Form, Formik } from "formik";
import { useSignInFormManagement } from "../../hooks/useSignInFormManagement";

function SignInForm() {
  const {
    handleSubmit,
    initialValues,
    validationSchema,
  } = useSignInFormManagement();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form noValidate>
        <Field type="email" name="email" placeholder="Email address" />
        <Field type="password" name="password" placeholder="Password" />
        <button type="submit">submit</button>
      </Form>
    </Formik>
  );
}

export default SignInForm;
