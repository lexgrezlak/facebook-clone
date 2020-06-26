import { UserData } from "./../types";
import { GET_USER } from "./../graphql/queries";
import { useApolloClient } from "@apollo/client";
interface Props {
  id: string;
}

export function useProfileHeader({ id }: Props) {
  const client = useApolloClient();
  const { user } = client.readQuery({
    query: GET_USER,
    variables: { id },
  }) as UserData;

  return { user };
}
