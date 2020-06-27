import { Post, PostAndUser } from "../../types";
import { CreatePostInput } from "../../../../server/src/resolvers/post/CreatePostInput";
import { FeedData } from "../../types";
import { useMutation } from "@apollo/client";
import { GET_FEED } from "../../graphql/queries";
import * as Yup from "yup";
import { UserPreview } from "../../types";
import { CREATE_POST } from "../../graphql/mutations";
import { useMe } from "../useMe";
interface CreatePostData {
  createPost: PostAndUser;
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
        const { feed } = store.readQuery({ query: GET_FEED }) as FeedData;
        data?.createPost &&
          store.writeQuery({
            query: GET_FEED,
            data: {
              feed: {
                ...feed,
                edges: [createPost, ...feed.edges],
              },
            },
          });

        resetForm();
      },
    });
  }

  const validationSchema = Yup.object().shape({});

  return { handleCreatePost, initialValues, validationSchema };
}
