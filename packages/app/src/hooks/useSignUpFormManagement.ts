import { useApolloClient, useMutation } from "@apollo/client";
import * as Yup from "yup";
import { SIGN_UP } from "../graphql/mutations";

export enum Gender {
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
  birthday: string;
  gender: Gender | null;
}

export const useSignUpFormManagement = () => {
  const client = useApolloClient();
  const [signUp] = useMutation(SIGN_UP, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleSubmit({
    passwordConfirm,
    birthday,
    ...signUpData
  }: SignUpFormFields) {
    await signUp({
      variables: { ...signUpData, birthday: new Date(birthday) },
    });
    await client.resetStore();
  }

  const initialValues: SignUpFormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    birthday: "2000-01-01",
    gender: null,
  };

  const validationSchema = Yup.object().shape({});

  return { handleSubmit, initialValues, validationSchema };
};
