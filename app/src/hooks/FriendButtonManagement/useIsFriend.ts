import { useQuery } from "@apollo/client";
import { GET_FRIEND_STATUS } from "../../graphql/queries";

interface FriendStatus {
  fromUserId: number;
  statusId: number;
}

interface FriendStatusData {
  friendStatus: FriendStatus;
}

interface FriendStatusVars {
  id: number;
}

interface Props {
  id: number;
  userId: number;
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

export enum IsFriend {
  IsNot,
  Is,
  MeSentRequest,
  MeReceivedRequest,
}
