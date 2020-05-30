import { useApolloClient } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { useAddFriend } from "./FriendButtonManagement/useAddFriend";
import { useRemoveFriend } from "./FriendButtonManagement/useRemoveFriend";
import { useRemoveRequest } from "./FriendButtonManagement/useRemoveRequest";
import { useAcceptRequest } from "./FriendButtonManagement/useAcceptRequest";
import { useIsFriend } from "./FriendButtonManagement/useIsFriend";

interface Props {
  id: string;
}

export const useFriendButtonManagement = ({ id }: Props) => {
  const client = useApolloClient();
  const data = client.readQuery({ query: GET_ME });
  const { id: userId } = data.me;

  const { handleAddFriend } = useAddFriend({ id, userId });
  const { handleRemoveFriend } = useRemoveFriend({ id });

  const { handleRemoveRequest } = useRemoveRequest({ id });
  const { handleAcceptRequest } = useAcceptRequest({ id });

  const { isFriend } = useIsFriend({ id, userId });

  return {
    isFriend,
    handleAddFriend,
    handleRemoveFriend,
    handleRemoveRequest,
    handleAcceptRequest,
  };
};
