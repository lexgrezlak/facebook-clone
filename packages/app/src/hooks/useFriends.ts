import { UserData } from "./../types";
import { GET_USER } from "./../graphql/queries";
import { useApolloClient } from "@apollo/client";
interface Props {
  id: string;
}

export function useFriends({ id }: Props) {
  const client = useApolloClient();
  const { user } = client.readQuery({
    query: GET_USER,
    variables: { id },
  }) as UserData;
  const { commonFriends, otherFriends } = user;

  const friends = [...commonFriends, ...otherFriends];
  const friendsCount = friends.length;
  const commonFriendsCount = commonFriends.length;

  return { friends, friendsCount, commonFriendsCount };
}
