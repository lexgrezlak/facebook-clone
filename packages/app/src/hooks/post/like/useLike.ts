import { PostsData } from "./../../../types";
import { useParams } from "react-router-dom";
import { GET_POSTS } from "../../../graphql/queries";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../../../graphql/mutations";

interface Props {
  postId: string;
}

export function useLike({ postId }: Props) {
  // gonna be undefined if it's home page
  const { id: userId } = useParams();

  const [like] = useMutation(LIKE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleLike() {
    return like({
      variables: { postId },
      optimisticResponse: {
        like: true,
      },
      update: (store) => {
        const variables = userId && { variables: { userId } };

        const { posts } = store.readQuery({
          query: GET_POSTS,
          ...variables,
        }) as PostsData;

        const post = posts.edges.find((post) => post.id === postId);
        if (post) {
          const { likesInfo } = post;
          const updatedPost = {
            ...post,
            likesInfo: {
              ...likesInfo,
              likes: likesInfo.likes + 1,
              isLiked: true,
            },
          };

          store.writeQuery({
            query: GET_POSTS,
            ...variables,
            data: {
              posts: {
                ...posts,
                edges: posts.edges.map((post) =>
                  post.id === postId ? updatedPost : post
                ),
              },
            },
          });
        }
      },
    });
  }

  return { handleLike };
}
