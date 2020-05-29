import { FeedData } from "./../types";
import { useMutation } from "@apollo/client";
import { GET_FEED } from "../graphql/queries";
import * as Yup from "yup";
import { UserPreview } from "../types";
import { CREATE_POST } from "../graphql/mutations";

interface CreatePostFormFields {
  content: string;
}

interface Props {
  me: UserPreview;
}

export function useCreatePostFormManagement({ me }: Props) {
  const initialValues: CreatePostFormFields = {
    content: "",
  };

  const [createPost] = useMutation(CREATE_POST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const { id, fullName, avatar } = me;

  function handleCreatePost(
    { content }: CreatePostFormFields,
    { resetForm }: any
  ) {
    return createPost({
      variables: { content },
      optimisticResponse: {
        __typename: "Mutation",
        createPost: {
          __typename: "Post",
          user: {
            id,
            fullName,
            avatar,
            __typename: "User",
          },
          content,
          createdAt: new Date(),
          id: 100000 + Math.floor(Math.random() * 999999),
        },
      },
      update: (store, { data: { createPost } }) => {
        const data = store.readQuery({ query: GET_FEED }) as FeedData;

        store.writeQuery({
          query: GET_FEED,
          data: {
            ...data,
            edges: [createPost, ...data.feed.edges],
          },
        });

        resetForm();
      },
    });
  }

  const validationSchema = Yup.object().shape({});

  return { handleCreatePost, initialValues, validationSchema };
}
