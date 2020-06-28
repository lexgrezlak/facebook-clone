import { PostsData } from "./../../../types";
import { CreateCommentInput } from "./../../../../../server/src/resolvers/post/comment/CreateCommentInput";
import { CommentsData } from "../../../types";
import { GET_COMMENTS, GET_POSTS } from "../../../graphql/queries";
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

        if (data) {
          // update comments list
          store.writeQuery({
            query: GET_COMMENTS,
            variables: { postId },
            data: {
              comments: [...comments, data.createComment],
            },
          });

          // update comments count
          const variables = userId && { variables: { userId } };

          const { posts } = store.readQuery({
            query: GET_POSTS,
            ...variables,
          }) as PostsData;

          const post = posts.edges.find((post) => post.id === postId);
          if (post) {
            const { commentsInfo } = post;
            const updatedPost = {
              ...post,
              commentsInfo: {
                ...commentsInfo,
                comments: commentsInfo.comments + 1,
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
        }

        resetForm();
      },
    });
  }

  const validationSchema = Yup.object().shape({});

  return { handleCreateComment, initialValues, validationSchema };
}
