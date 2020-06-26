import { USER_PREVIEW } from "./fragments";
import { gql } from "@apollo/client";

export const MESSAGE_RECEIVED = gql`
  subscription MessageReceived {
    messageReceived {
      id
      content
      chatId
      readTime
      sentTime
      user {
        ...UserPreview
      }
    }
  }
  ${USER_PREVIEW}
`;
