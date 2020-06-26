import { MeData } from "./../types";
import { GET_ME } from "./../graphql/queries";
import { useApolloClient } from "@apollo/client";

export const useMe = () => {
  const client = useApolloClient();
  const data = client.readQuery({ query: GET_ME }) as MeData;

  return data.me;
};
