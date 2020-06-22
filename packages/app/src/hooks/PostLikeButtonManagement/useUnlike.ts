import { LikesOfPostData } from "./../../types";
import { GET_LIKES_OF_POST, GET_IS_POST_LIKED } from "./../../graphql/queries";
import { useMutation } from "@apollo/client";
import { UNLIKE_POST } from "../../graphql/mutations";

interface Props {
  postId: string;
}

export function useUnlike({ postId }: Props) {
  const [unlike] = useMutation(UNLIKE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleUnlike() {
    return unlike({
      variables: { postId },
      update: (store) => {
        const { likesOfPost } = store.readQuery({
          query: GET_LIKES_OF_POST,
          variables: { postId },
        }) as LikesOfPostData;

        store.writeQuery({
          query: GET_LIKES_OF_POST,
          variables: { postId },
          data: {
            likesOfPost: likesOfPost - 1,
          },
        });

        store.writeQuery({
          query: GET_IS_POST_LIKED,
          variables: { postId },
          data: {
            isPostLiked: false,
          },
        });

        //   const data = store.readQuery({
        //     query: GET_FRIEND_REQUESTS,
        //   }) as FriendRequestsData;
        //   store.writeQuery({
        //     query: GET_FRIEND_REQUESTS,
        //     data: {
        //       friendRequests: data.friendRequests.filter(
        //         (friendRequest: FriendRequest) =>
        //           friendRequest.fromUser.id !== userId
        //       ),
        //     },
        //   });
      },
    });
  }

  return { handleUnlike };
}
