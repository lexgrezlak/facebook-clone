import { UserData, Post } from "./../../../types";
import { CreateCommentInput } from "./../../../../../server/src/resolvers/post/comment/CreateCommentInput";
import { CommentsData, FeedData } from "../../../types";
import { GET_COMMENTS, GET_POSTS, GET_USER } from "../../../graphql/queries";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { CREATE_COMMENT } from "../../../graphql/mutations";
import { useParams } from "react-router-dom";

interface CreateCommentData {
  createComment: Comment;
}

interface CreateCommentVars {
  input: CreateCommentInput;
  postId: string;
}

interface Props {
  postId: string;
}

export function useCreateCommentForm({ postId }: Props) {
  // id won't be undefined if its user's profile
  const { id: userId } = useParams();

  const initialValues: CreateCommentInput = {
    content: "",
  };

  const [createComment] = useMutation<CreateCommentData, CreateCommentVars>(
    CREATE_COMMENT
  );

  function handleCreateComment(input: CreateCommentInput, { resetForm }: any) {
    return createComment({
      variables: { input, postId },
      update: (store, { data }) => {
        const { comments } = store.readQuery({
          query: GET_COMMENTS,
          variables: { postId },
        }) as CommentsData;

        // 1. update comments list
        store.writeQuery({
          query: GET_COMMENTS,
          variables: { postId },
          data: {
            comments: [...comments, data?.createComment],
          },
        });

        // 2. update comments count

        // if the route is user's profile
        if (userId) {
          const { user } = store.readQuery({
            query: GET_USER,
            variables: { id: userId },
          }) as UserData;

          const post = user.posts.find((post) => post.id === postId) as Post;
          const { commentsInfo } = post;

          const updatedPost = {
            ...post,
            commentsInfo: {
              ...commentsInfo,
              comments: commentsInfo.comments + 1,
            },
          };

          store.writeQuery({
            query: GET_USER,
            variables: { id: userId },
            data: {
              user: {
                ...user,
                posts: user.posts.map((post) =>
                  post.id === postId ? updatedPost : post
                ),
              },
            },
          });
          // else if it's home page
        } else {
          const { feed } = store.readQuery({ query: GET_POSTS }) as FeedData;

          // the post being updated
          const post = feed.edges.find((post) => post.id === postId);

          if (post) {
            const { commentsInfo } = post;
            const updatedPost = {
              ...post,
              commentsInfo: {
                ...commentsInfo,
                comments: commentsInfo.comments + 1,
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
        }

        resetForm();
      },
    });
  }

  const validationSchema = Yup.object().shape({});

  return { handleCreateComment, initialValues, validationSchema };
}
