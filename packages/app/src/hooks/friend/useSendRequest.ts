import { UserData, FriendshipStatus } from "../../types";
import { GET_USER } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
import { SEND_REQUEST } from "../../graphql/mutations";

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
      optimisticResponse: {
        sendRequest: true,
      },
      update: (store) => {
        const { user } = store.readQuery({
          query: GET_USER,
          variables: { id: userId },
        }) as UserData;

        store.writeQuery({
          query: GET_USER,
          variables: { id: userId },
          data: {
            user: {
              ...user,
              friendshipStatus: FriendshipStatus.MeSentRequest,
            },
          },
        });
      },
    });
  }

  return { handleSendRequest };
}
