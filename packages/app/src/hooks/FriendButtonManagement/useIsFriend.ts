import { Status } from "./../../../../server/src/entity/FriendStatus";
import { useQuery } from "@apollo/client";
import { GET_FRIEND_STATUS } from "../../graphql/queries";
import { IsFriend } from "../../types";

interface FriendStatus {
  fromUserId: number;
  statusId: Status;
}

interface FriendStatusData {
  friendStatus: FriendStatus;
}

interface FriendStatusVars {
  id: string;
}

interface Props {
  id: string;
  userId: string;
}

export function useIsFriend({ id, userId }: Props) {
  const { data } = useQuery<FriendStatusData, FriendStatusVars>(
    GET_FRIEND_STATUS,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
      variables: { id },
    }
  );

  const fromUserId = data?.friendStatus?.fromUserId;
  const statusId = data?.friendStatus?.statusId;

  let isFriend: IsFriend;

  switch (statusId) {
    case 1:
      isFriend = IsFriend.Is;
      break;
    case 2:
      isFriend =
        userId === fromUserId
          ? IsFriend.MeSentRequest
          : IsFriend.MeReceivedRequest;
      break;
    default:
      isFriend = IsFriend.IsNot;
      break;
  }

  return { isFriend };
}
