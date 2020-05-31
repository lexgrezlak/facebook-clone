import { useQuery } from "@apollo/client";
import { GET_FRIEND_STATUS } from "../../graphql/queries";
import { FriendshipStatus } from "../../types";
import { Status } from "../../enums";

interface FriendStatus {
  fromUserId: string;
  status: Status;
}

interface FriendStatusData {
  friendStatus: FriendStatus;
}

interface FriendStatusVars {
  userId: string;
}

interface Props {
  userId: string;
}

export function useIsFriend({ userId }: Props) {
  const { data } = useQuery<FriendStatusData, FriendStatusVars>(
    GET_FRIEND_STATUS,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
      variables: { userId },
    }
  );

  const fromUserId = data?.friendStatus?.fromUserId;
  const status = data?.friendStatus?.status;

  let friendshipStatus: FriendshipStatus;

  switch (status) {
    case Status.FRIENDS:
      friendshipStatus = FriendshipStatus.FRIEND;
      break;
    case Status.PENDING:
      friendshipStatus =
        userId === fromUserId
          ? FriendshipStatus.ME_RECEIVED_REQUEST
          : FriendshipStatus.ME_SENT_REQUEST;
      break;
    default:
      friendshipStatus = FriendshipStatus.STRANGER;
      break;
  }

  return { isFriend: friendshipStatus };
}
