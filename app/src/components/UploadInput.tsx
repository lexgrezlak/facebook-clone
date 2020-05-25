import React from "react";
import { useMutation } from "@apollo/client";
import { GET_ME, UPDATE_AVATAR } from "../queries";

function UploadInput() {
  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  function handleChange({
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

  return (
    <div>
      <input accept="image/*" type="file" onChange={handleChange} />
    </div>
  );
}

export default UploadInput;
