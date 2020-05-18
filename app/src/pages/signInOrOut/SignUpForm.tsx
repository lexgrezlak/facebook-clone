import React, { useEffect, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_UP } from "../../queries";
import {
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
  FormikState,
} from "formik";
import * as Yup from "yup";
import DateField from "./DateField";

enum Gender {
  Female = "FEMALE",
  Male = "MALE",
  Other = "OTHER",
}

interface SignUpFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthday: Date;
  gender: Gender | null;
}

function SignUpForm() {
  const client = useApolloClient();

  const [signUp, { data }] = useMutation(SIGN_UP, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (data?.signIn) {
      const { token } = data.signIn;
      localStorage.setItem("token", token);
      client.resetStore();
    }
  });

  async function handleSubmit({
    passwordConfirm,
    ...signUpData
  }: SignUpFormFields) {
    console.log(signUpData);
    return signUp({ variables: { ...signUpData } });
  }

  const initialValues: SignUpFormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    birthday: new Date("01-01-2000"),
    gender: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        passwordConfirm: Yup.string().min(8, "Too short"),
      })}
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
          <Field
            name="gender"
            placeholder="Gender"
            component={({ field }: any) => (
              <>
                <div>
                  <input
                    {...field}
                    id="female"
                    value="FEMALE"
                    checked={field.value === "FEMALE"}
                    name="gender"
                    type="radio"
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div>
                  <input
                    {...field}
                    id="male"
                    value="MALE"
                    checked={field.value === "MALE"}
                    name="gender"
                    type="radio"
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input
                    {...field}
                    id="other"
                    value="OTHER"
                    checked={field.value === "OTHER"}
                    name="gender"
                    type="radio"
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </>
            )}
          />
          <button type="submit" disabled={isSubmitting}>
            submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SignUpForm;
