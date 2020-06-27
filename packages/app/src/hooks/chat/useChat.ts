import { GET_CHAT, GET_CHATS } from "./../../graphql/queries";
import { ChatData, MessageReceivedData, ChatsData } from "./../../types";
import { useQuery, useSubscription } from "@apollo/client";
import { MESSAGE_RECEIVED } from "../../graphql/subscriptions";

interface Props {
  chatId: string;
}

export const useChat = ({ chatId }: Props) => {
  const { data, client } = useQuery<ChatData>(GET_CHAT, {
    variables: { id: chatId },
  });

  const chat = data?.chat;

  // update the unread badge (mark the chat as read)
  if (chat) {
    const { chats } = client.readQuery({ query: GET_CHATS }) as ChatsData;
    const theChat = chats.find((chat) => chat.id === chatId);
    const readChat = { ...theChat, unread: false };
    client.writeQuery({
      query: GET_CHATS,
      data: {
        chats: chats.map((chat) => (chat.id === chatId ? readChat : chat)),
      },
    });
  }

  useSubscription<MessageReceivedData>(MESSAGE_RECEIVED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const messageReceived = subscriptionData.data?.messageReceived;

      if (messageReceived && chat) {
        client.writeQuery({
          query: GET_CHAT,
          variables: { id: chatId },
          data: {
            chat: { ...chat, messages: [...chat.messages, messageReceived] },
          },
        });
      }
    },
  });

  return { chat };
};
