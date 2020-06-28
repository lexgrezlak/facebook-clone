import { UserData } from "./../../types";
import { GET_USER } from "../../graphql/queries";
import { useApolloClient } from "@apollo/client";

interface Props {
  userId: string;
}

export function useFriendshipStatus({ userId }: Props) {
  const client = useApolloClient();
  const {
    user: { friendshipStatus },
  } = client.readQuery({
    query: GET_USER,
    variables: { id: userId },
  }) as UserData;

  return friendshipStatus;
}
