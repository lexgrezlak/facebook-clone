import { useSendRequest } from "./friendButton/useSendRequest";
import { useUnfriend } from "./friendButton/useUnfriend";
import { useCancelRequest } from "./friendButton/useCancelRequest";
import { useAcceptRequest } from "./friendButton/useAcceptRequest";
import { useIsFriend } from "./friendButton/useIsFriend";

interface Props {
  userId: string;
}

export const useFriendButton = ({ userId }: Props) => {
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
