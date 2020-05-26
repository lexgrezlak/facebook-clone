import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_POST, GET_FEED, GET_ME } from "../queries";
import * as Yup from "yup";

interface CreatePostFormFields {
  content: string;
}

interface Props {
  firstName: string;
  lastName: string;
}

export function useCreatePostFormManagement({ firstName, lastName }: Props) {
  const initialValues: CreatePostFormFields = {
    content: "",
  };

  const [createPost] = useMutation(CREATE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function handleCreatePost({ content }: CreatePostFormFields) {
    return createPost({
      variables: { content },
      optimisticResponse: {
        __typename: "Mutation",
        createPost: {
          __typename: "Post",
          author: {
            firstName,
            lastName,
            id: 100000 + Math.random() * 99999,
            __typename: "User",
          },
          content,
          createdAt: new Date(),
          id: 100000 + Math.random() * 999999,
        },
      },
      update: (store, { data: { createPost } }) => {
        const data = store.readQuery({ query: GET_FEED }) as any;
        store.writeQuery({
          query: GET_FEED,
          data: {
            ...data,
            feed: [createPost, ...data.feed],
          },
        });
      },
    });
  }

  const validationSchema = Yup.object().shape({});

  return { handleCreatePost, initialValues, validationSchema };
}
