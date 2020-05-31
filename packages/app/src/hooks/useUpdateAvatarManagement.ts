import { useMutation } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { UPDATE_AVATAR } from "../graphql/mutations";
import { MeData } from "../types";

interface UpdateAvatarData {
  updateAvatar: string;
}

interface UpdateAvatarVars {
  file: File;
}

export function useUpdateAvatarManagement() {
  const [updateAvatar, { loading }] = useMutation<
    UpdateAvatarData,
    UpdateAvatarVars
  >(UPDATE_AVATAR, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  function handleUpdateAvatar({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    return (
      validity.valid &&
      updateAvatar({
        variables: { file },
        update: (store, { data }) => {
          const dataInStore = store.readQuery({ query: GET_ME }) as MeData;

          store.writeQuery({
            query: GET_ME,
            data: {
              me: {
                ...dataInStore.me,
                avatar: data?.updateAvatar,
              },
            },
          });
        },
      })
    );
  }

  return { handleUpdateAvatar, loading };
}
