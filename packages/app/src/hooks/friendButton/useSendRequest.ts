import { MeData } from "../../types";
import { GET_ME } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { GET_FRIEND_STATUS } from "../../graphql/queries";
import { SEND_REQUEST } from "../../graphql/mutations";
import { Status } from "../../enums";

interface Props {
  userId: string;
}

interface SendRequestData {
  sendRequest: boolean;
}

interface SendRequestVars {
  userId: string;
}

export function useSendRequest({ userId }: Props) {
  const [sendRequest] = useMutation<SendRequestData, SendRequestVars>(
    SEND_REQUEST,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  async function handleSendRequest() {
    await sendRequest({
      variables: { userId },
      update: (store) => {
        const { me } = store.readQuery({ query: GET_ME }) as MeData;
        const fromUserId = me.id;

        store.writeQuery({
          query: GET_FRIEND_STATUS,
          variables: { userId },
          data: {
            friendStatus: {
              __typename: "FriendStatus",
              fromUserId,
              status: Status.PENDING,
            },
          },
        });
      },
    });
  }

  return { handleSendRequest };
}
