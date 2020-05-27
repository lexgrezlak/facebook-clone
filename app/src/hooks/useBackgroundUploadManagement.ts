import { useMutation } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { UPDATE_BACKGROUND } from "../graphql/mutations";
import { MeData } from "../types";

export function useBackgroundUploadManagement() {
  const [updateBackground, { loading }] = useMutation(UPDATE_BACKGROUND, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  function handleUpdateBackground({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    return (
      validity.valid &&
      updateBackground({
        variables: { file },
        update: (store, { data: { updateBackground } }) => {
          const data = store.readQuery({ query: GET_ME }) as MeData;
          store.writeQuery({
            query: GET_ME,
            data: {
              me: {
                ...data.me,
                background: updateBackground.url,
              },
            },
          });
        },
      })
    );
  }

  return { handleUpdateBackground, loading };
}
