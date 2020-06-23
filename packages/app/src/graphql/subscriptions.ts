import { gql } from "@apollo/client";

export const MESSAGE_RECEIVED = gql`
  subscription MessageReceived {
    messageReceived {
      id
      content
      chatId
    }
  }
`;
