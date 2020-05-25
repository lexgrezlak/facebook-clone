import { useApolloClient } from "@apollo/client";
import { GET_ME } from "../queries";
import { useAdd } from "./FriendButtonManagement/useAdd";
import { useRemove } from "./FriendButtonManagement/useRemove";
import { useCancel } from "./FriendButtonManagement/useCancel";
import { useAccept } from "./FriendButtonManagement/useAccept";
import { useIsFriend } from "./FriendButtonManagement/useIsFriend";

interface Props {
  id: number;
}

export const useFriendButtonManagement = ({ id }: Props) => {
  const client = useApolloClient();
  const meData = client.readQuery({ query: GET_ME });
  const { id: userId } = meData.me;

  const { addFriend } = useAdd({ id, userId });
  const { removeFriend } = useRemove({ id });
  const { cancelRequest } = useCancel({ id });
  const { acceptRequest } = useAccept({ id });
  const { isFriend } = useIsFriend({ id, userId });

  return { isFriend, addFriend, removeFriend, cancelRequest, acceptRequest };
};
