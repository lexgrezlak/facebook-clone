import { useMutation } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import * as Yup from "yup";
import { SIGN_IN } from "../graphql/mutations";

interface SignInFormFields {
  email: string;
  password: string;
}

export const useSignInFormManagement = () => {
  const [signIn] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleSubmit({ email, password }: SignInFormFields) {
    return signIn({
      variables: { email, password },
      update: (store, { data }) => {
        store.writeQuery({
          query: GET_ME,
          data: {
            me: data.signIn,
          },
        });
      },
    });
  }

  const initialValues: SignInFormFields = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({});

  return { handleSubmit, initialValues, validationSchema };
};
