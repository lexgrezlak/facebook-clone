import { SignInInput } from "./../../../server/src/resolvers/SignInInput";
import { UserPreview } from "../../types";
import { useMutation } from "@apollo/client";
import { GET_ME } from "../../graphql/queries";
import * as Yup from "yup";
import { SIGN_IN } from "../../graphql/mutations";

interface SignInData {
  signIn: UserPreview;
}

interface SignInVars {
  input: SignInInput;
}

export const useSignInFormManagement = () => {
  const [signIn] = useMutation<SignInData, SignInVars>(SIGN_IN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    update: (store, { data }) => {
      data?.signIn &&
        store.writeQuery({
          query: GET_ME,
          data: {
            me: data.signIn,
          },
        });
    },
  });

  async function handleSubmit(input: SignInInput) {
    return signIn({
      variables: { input },
    });
  }

  const initialValues: SignInInput = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({});

  return { handleSubmit, initialValues, validationSchema };
};
