import { useMutation } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import { UPDATE_AVATAR } from "../graphql/mutations";

export function useAvatarUploadManagement() {
  const [updateAvatar, { loading }] = useMutation(UPDATE_AVATAR, {
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
        update: (store, { data: { updateAvatar } }) => {
          const data = store.readQuery({ query: GET_ME }) as any;
          store.writeQuery({
            query: GET_ME,
            data: {
              me: {
                ...data.me,
                avatar: updateAvatar.url,
              },
            },
          });
        },
      })
    );
  }

  return { handleUpdateAvatar, loading };
}
