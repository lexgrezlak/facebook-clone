import { useParams } from "react-router-dom";
import { UserData } from "./../types";
import { GET_USER } from "./../graphql/queries";
import { useApolloClient } from "@apollo/client";

export function useProfileHeader() {
  const client = useApolloClient();
  const { id } = useParams();
  const { user } = client.readQuery({
    query: GET_USER,
    variables: { id },
  }) as UserData;

  return { user };
}
