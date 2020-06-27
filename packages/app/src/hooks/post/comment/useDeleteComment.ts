import { PostsData } from "./../../../types";
import { CommentsData, FeedData } from "../../../types";
import { GET_COMMENTS, GET_POSTS } from "../../../graphql/queries";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../../../graphql/mutations";

interface Props {
  commentId: string;
  postId: string;
}

export default function useDeleteComment({ commentId, postId }: Props) {
  const [deleteComment] = useMutation(DELETE_COMMENT);

  function handleDeleteComment() {
    return deleteComment({
      variables: { id: commentId },
      update: (store) => {
        // update comments list
        const { comments } = store.readQuery({
          query: GET_COMMENTS,
          variables: { postId },
        }) as CommentsData;

        store.writeQuery({
          query: GET_COMMENTS,
          variables: { postId },
          data: {
            comments: comments.filter((comment) => comment.id !== commentId),
          },
        });

        // update comments count
        const { posts } = store.readQuery({
          query: GET_POSTS,
        }) as PostsData;

        const post = posts.edges.find((post) => post.id === postId);

        if (post) {
          const { commentsInfo } = post;
          const updatedPost = {
            ...post,
            commentsInfo: {
              ...commentsInfo,
              comments: commentsInfo.comments - 1,
            },
          };
          store.writeQuery({
            query: GET_POSTS,
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

  return { handleDeleteComment };
}
