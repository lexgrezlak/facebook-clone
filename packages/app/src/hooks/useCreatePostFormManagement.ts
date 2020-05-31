import { CreatePostInput } from "../../../server/src/resolvers/post/CreatePostInput";
import { FeedData, PostAndUser } from "./../types";
import { useMutation } from "@apollo/client";
import { GET_FEED } from "../graphql/queries";
import * as Yup from "yup";
import { UserPreview } from "../types";
import { CREATE_POST } from "../graphql/mutations";

interface Props {
  me: UserPreview;
}

interface CreatePostData {
  createPost: PostAndUser;
}

interface CreatePostVars {
  input: CreatePostInput;
}

export function useCreatePostFormManagement({ me }: Props) {
  const initialValues: CreatePostInput = {
    content: "",
  };

  const [createPost] = useMutation<CreatePostData, CreatePostVars>(
    CREATE_POST,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  const { id, fullName, avatar } = me;

  function handleCreatePost(input: CreatePostInput, { resetForm }: any) {
    return createPost({
      variables: { input },
      optimisticResponse: {
        // __typename: "Mutation",
        createPost: {
          // __typename: "Post",
          user: {
            id,
            fullName,
            avatar,
            // __typename: "User",
          },
          content: input.content,
          createdAt: new Date(),
          id: (Math.random() * 999999).toString(),
        },
      },
      update: (store, { data }) => {
        const dataInStore = store.readQuery({ query: GET_FEED }) as FeedData;
        data?.createPost &&
          store.writeQuery({
            query: GET_FEED,
            data: {
              feed: {
                ...dataInStore.feed,
                edges: [createPost, ...dataInStore.feed.edges],
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
