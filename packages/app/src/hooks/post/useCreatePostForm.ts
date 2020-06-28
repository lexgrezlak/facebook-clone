import { PostsData, Post } from "./../../types";
import { CreatePostInput } from "../../../../server/src/resolvers/post/CreatePostInput";
import { useMutation } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import * as Yup from "yup";
import { CREATE_POST } from "../../graphql/mutations";
import { useMe } from "../useMe";

interface CreatePostData {
  createPost: Post;
}

interface CreatePostVars {
  input: CreatePostInput;
}

export function useCreatePostForm() {
  const { id, fullName, avatar } = useMe();

  const initialValues: CreatePostInput = {
    content: "",
  };

  const [createPost] = useMutation<CreatePostData, CreatePostVars>(CREATE_POST);

  function handleCreatePost(input: CreatePostInput, { resetForm }: any) {
    return createPost({
      variables: { input },
      optimisticResponse: {
        createPost: {
          user: {
            id,
            fullName,
            avatar,
          },
          likesInfo: {
            likes: 0,
            isLiked: false,
          },
          commentsInfo: {
            comments: 0,
          },
          content: input.content,
          createdAt: new Date(),
          id: (Math.random() * 99999).toString(),
        },
      },
      update: (store, { data }) => {
        const { posts } = store.readQuery({ query: GET_POSTS }) as PostsData;

        if (data?.createPost) {
          store.writeQuery({
            query: GET_POSTS,
            data: {
              posts: {
                ...posts,
                edges: [createPost, ...posts.edges],
              },
            },
          });

          // update own profile in cache if it's cached
          try {
            const { posts: profilePosts } = store.readQuery({
              query: GET_POSTS,
              variables: { userId: id },
            }) as PostsData;

            store.writeQuery({
              query: GET_POSTS,
              variables: { userId: id },
              data: {
                posts: {
                  ...profilePosts,
                  edges: [createPost, ...profilePosts.edges],
                },
              },
            });

            // if posts data not found do nothing
          } catch {}
        }
        resetForm();
      },
    });
  }

  const validationSchema = Yup.object().shape({});

  return { handleCreatePost, initialValues, validationSchema };
}
