import { UserData } from "../types";
import { useMutation, useApolloClient } from "@apollo/client";
import { GET_ME, GET_USER } from "../graphql/queries";
import { UPDATE_BACKGROUND } from "../graphql/mutations";

interface UpdateBackgroundData {
  updateBackground: string;
}

interface UpdateBackgroundVars {
  file: File;
}

export function useUpdateBackgroundManagement() {
  const client = useApolloClient();
  const data = client.readQuery({ query: GET_ME });
  const { id } = data.me;

  const [updateBackground, { loading }] = useMutation<
    UpdateBackgroundData,
    UpdateBackgroundVars
  >(UPDATE_BACKGROUND, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  function handleUpdateBackground({
    target: { validity, files },
  }: React.ChangeEvent<HTMLInputElement>) {
    if (!files) throw new Error("Invalid input");
    const file = files[0];
    return (
      validity.valid &&
      updateBackground({
        variables: { file },
        update: (store, { data }) => {
          const dataInStore = store.readQuery({
            query: GET_USER,
            variables: { id },
          }) as UserData;

          store.writeQuery({
            query: GET_USER,
            variables: { id },
            data: {
              user: {
                ...dataInStore.user,
                background: data?.updateBackground,
              },
            },
          });
        },
      })
    );
  }

  return { handleUpdateBackground, loading };
}
