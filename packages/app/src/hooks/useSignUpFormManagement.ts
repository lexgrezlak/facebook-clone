import { useApolloClient, useMutation } from "@apollo/client";
import * as Yup from "yup";
import { SIGN_UP } from "../graphql/mutations";

interface SignUpFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthday: string;
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
    ...remainingData
  }: SignUpFormFields) {
    await signUp({
      variables: { data: { ...remainingData, birthday: new Date(birthday) } },
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
  };

  const validationSchema = Yup.object().shape({});

  return { handleSubmit, initialValues, validationSchema };
};
