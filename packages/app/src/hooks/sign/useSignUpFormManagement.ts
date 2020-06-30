import { SignUpInput } from "./../../../server/src/resolvers/SignUpInput";
import { useApolloClient, useMutation } from "@apollo/client";
import * as Yup from "yup";
import { SIGN_UP } from "../../graphql/mutations";
import { GET_ME } from "../../graphql/queries";
import { UserPreview } from "../../types";

interface SignUpFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthday: string;
}

interface SignUpData {
  signUp: UserPreview;
}

interface SignUpVars {
  input: SignUpInput;
}

export const useSignUpFormManagement = () => {
  const client = useApolloClient();
  const [signUp] = useMutation<SignUpData, SignUpVars>(SIGN_UP, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleSubmit(input: SignUpFormFields) {
    // no need to send password confirm to the server because of validation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, birthday, ...restInput } = input;

    await signUp({
      variables: {
        input: {
          ...restInput,
          birthday: new Date(birthday),
        },
      },
      update: (store, { data }) => {
        if (data) {
          store.writeQuery({
            query: GET_ME,
            data: {
              me: data.signUp,
            },
          });
        }
      },
    });
    client.resetStore();
  }

  const initialValues: SignUpFormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    // birthday is a string because otherwise the calendar doesn't work properly
    // TODO
    birthday: "2000-01-01",
  };

  const validationSchema = Yup.object().shape({});

  return { handleSubmit, initialValues, validationSchema };
};
