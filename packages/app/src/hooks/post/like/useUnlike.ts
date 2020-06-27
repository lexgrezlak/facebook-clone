import { useParams } from "react-router-dom";
import { PostsData } from "../../../types";
import { GET_POSTS } from "../../../graphql/queries";
import { useMutation } from "@apollo/client";
import { UNLIKE_POST } from "../../../graphql/mutations";

interface Props {
  postId: string;
}

export function useUnlike({ postId }: Props) {
  // gonna be undefined if it's home page
  const { id: userId } = useParams();
  const [unlike] = useMutation(UNLIKE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleUnlike() {
    return unlike({
      variables: { postId },
      optimisticResponse: {
        unlike: true,
      },
      update: (store) => {
        const variables = userId && { variables: { id: userId } };

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
              likes: likesInfo.likes - 1,
              isLiked: false,
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

  return { handleUnlike };
}
