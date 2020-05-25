import React from "react";
import { useMutation } from "@apollo/client";
import { SINGLE_UPLOAD } from "../queries";

function UploadInput() {
  const [uploadImage, { data }] = useMutation(SINGLE_UPLOAD, {
    onError: (error) => {
      console.log("error");
    },
  });

  function handleChange({
    target: {
      validity,
      files: [file],
    },
  }: any) {
    console.log(file);
    return validity.valid && uploadImage({ variables: { file } });
  }

  return (
    <div>
      <input accept="image/*" type="file" onChange={handleChange} />
    </div>
  );
}

export default UploadInput;
