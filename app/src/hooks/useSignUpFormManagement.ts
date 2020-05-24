import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_UP } from "../queries";
import * as Yup from "yup";
import { Gender } from "../../../common/types";

interface SignUpFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthday: Date;
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
    ...signUpData
  }: SignUpFormFields) {
    await signUp({ variables: { ...signUpData } });
    await client.resetStore();
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

  const validationSchema = Yup.object().shape({});

  return { handleSubmit, initialValues, validationSchema };
};
