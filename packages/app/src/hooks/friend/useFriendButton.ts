import { useSendRequest } from "./useSendRequest";
import { useUnfriend } from "./useUnfriend";
import { useCancelRequest } from "./useCancelRequest";
import { useAcceptRequest } from "./useAcceptRequest";

interface Props {
  userId: string;
}

export const useFriendButton = ({ userId }: Props) => {
  const { handleSendRequest } = useSendRequest({ userId });
  const { handleUnfriend } = useUnfriend({ userId });
  const { handleCancelRequest } = useCancelRequest({ userId });
  const { handleAcceptRequest } = useAcceptRequest({ userId });

  return {
    handleSendRequest,
    handleUnfriend,
    handleCancelRequest,
    handleAcceptRequest,
  };
};
