import { CommentsData } from "./../../../types";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../graphql/queries";

interface Props {
  postId: string;
}

interface CommentsVars {
  postId: string;
}

export function useComments({ postId }: Props) {
  const { data } = useQuery<CommentsData, CommentsVars>(GET_COMMENTS, {
    variables: { postId },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const comments = data?.comments;

  return comments;
}
