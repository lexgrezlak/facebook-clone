import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DateField from "./DateField";
import RadioField from "./RadioField";
import { useSignUpFormManagement } from "../../hooks/useSignUpFormManagement";

function SignUpForm() {
  const {
    handleSubmit,
    initialValues,
    validationSchema,
  } = useSignUpFormManagement();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <Field type="text" name="firstName" placeholder="First name" />
          <Field type="text" name="lastName" placeholder="Last name" />
          <Field type="email" name="email" placeholder="Email address" />
          <Field type="password" name="password" placeholder="Password" />
          <Field
            type="password"
            name="passwordConfirm"
            placeholder="Confirm password"
          />
          <DateField name="birthday" />
          <RadioField name="gender" />
          <button type="submit" disabled={isSubmitting}>
            submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
