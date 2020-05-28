import { gql } from "@apollo/client";

export const USER_PREVIEW = gql`
  fragment UserPreview on User {
    id
    firstName
    lastName
    avatar
  }
`;

export const POST_PREVIEW = gql`
  fragment PostPreview on Post {
    id
    content
    createdAt
  }
`;
