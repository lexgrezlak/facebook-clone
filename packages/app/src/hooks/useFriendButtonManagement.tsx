import { useSendRequest } from "./FriendButtonManagement/useSendRequest";
import { useUnfriend } from "./FriendButtonManagement/useUnfriend";
import { useCancelRequest } from "./FriendButtonManagement/useCancelRequest";
import { useAcceptRequest } from "./FriendButtonManagement/useAcceptRequest";
import { useIsFriend } from "./FriendButtonManagement/useIsFriend";

interface Props {
  userId: string;
}

export const useFriendButtonManagement = ({ userId }: Props) => {
  const { handleSendRequest } = useSendRequest({ userId });
  const { handleUnfriend } = useUnfriend({ userId });
  const { handleCancelRequest } = useCancelRequest({ userId });
  const { handleAcceptRequest } = useAcceptRequest({ userId });

  const { isFriend } = useIsFriend({ userId });

  return {
    isFriend,
    handleSendRequest,
    handleUnfriend,
    handleCancelRequest,
    handleAcceptRequest,
  };
};
