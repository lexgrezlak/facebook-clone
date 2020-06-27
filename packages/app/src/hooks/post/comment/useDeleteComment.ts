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
        // 1. update comments list
        const { comments } = store.readQuery({
          query: GET_COMMENTS,
          variables: { postId },
        }) as CommentsData;

        const processedComments = comments.filter(
          (comment) => comment.id !== commentId
        );

        store.writeQuery({
          query: GET_COMMENTS,
          variables: { postId },
          data: {
            comments: processedComments,
          },
        });

        // 2. update comments count
        const { feed } = store.readQuery({
          query: GET_POSTS,
        }) as FeedData;

        // the post being updated
        const post = feed.edges.find((post) => post.id === postId);

        if (post) {
          const { commentsInfo } = post;
          const updatedPost = {
            ...post,
            commentsInfo: {
              ...commentsInfo,
              comments: commentsInfo.comments - 1,
            },
          };
          const updatedEdges = feed.edges.map((post) =>
            post.id === postId ? updatedPost : post
          );

          store.writeQuery({
            query: GET_POSTS,
            data: {
              feed: {
                ...feed,
                edges: updatedEdges,
              },
            },
          });
        }
      },
    });
  }

  return { handleDeleteComment };
}
