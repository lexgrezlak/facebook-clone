import { useQuery } from "@apollo/client";
import React from "react";
import { GET_IS_POST_LIKED } from "../../graphql/queries";

interface Props {
  postId: string;
}

interface IsPostLikedData {
  isPostLiked: boolean;
}

interface IsPostLikedVars {
  postId: string;
}

export default function useIsLiked({ postId }: Props) {
  const { data } = useQuery<IsPostLikedData, IsPostLikedVars>(
    GET_IS_POST_LIKED,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
      variables: { postId },
    }
  );

  const isLiked = data?.isPostLiked;

  return { isLiked };
}
