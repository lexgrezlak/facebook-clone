import { GET_ME } from "./../../graphql/queries";
import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_OUT } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

export default function useSignOut() {
  const client = useApolloClient();
  const [signOut] = useMutation(SIGN_OUT, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/");
    client.writeQuery({ query: GET_ME, data: { me: null } });
  }

  return { handleSignOut };
}
