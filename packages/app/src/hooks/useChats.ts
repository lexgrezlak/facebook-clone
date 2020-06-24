import { MessageReceivedData } from "./../types";
import { useApolloClient, useSubscription, useQuery } from "@apollo/client";
import { MESSAGE_RECEIVED } from "../graphql/subscriptions";
import { GET_CHATS } from "../graphql/queries";
import { ChatsData } from "../types";

export const useChats = () => {
  const client = useApolloClient();
  const { data } = useQuery<ChatsData>(GET_CHATS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const chats = data?.chats || [];

  useSubscription<MessageReceivedData>(MESSAGE_RECEIVED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const messageReceived = subscriptionData.data?.messageReceived;

      if (messageReceived) {
        const { chats } = client.readQuery({
          query: GET_CHATS,
        }) as ChatsData;

        // set the last message of the chat to the received one
        const messageReceivedChat = {
          ...chats.find((chat) => chat.id === messageReceived.chatId),
          lastMessage: messageReceived,
        };

        // get the rest of the chats
        const otherChats = chats.filter(
          (chat) => chat.id !== messageReceived.chatId
        );

        // combined array of those chats
        const updatedChats = [messageReceivedChat, ...otherChats];

        // update store the store with the chats
        client.writeQuery({
          query: GET_CHATS,
          data: {
            chats: updatedChats,
          },
        });
      }
    },
  });

  return { chats };
};
