import React from "react";
import { useMutation } from "@apollo/client";
import { GET_ME, UPDATE_AVATAR } from "../queries";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  createStyles,
  IconButton,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      display: "none",
    },
    icon: {
      cursor: "pointer",
      color: "black",
    },
    button: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      backgroundColor: "#f0f0f0",
      borderRadius: "50%",
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
    },
  })
);

function UploadInput() {
  const classes = useStyles();
  const [updateAvatar, { loading }] = useMutation(UPDATE_AVATAR, {
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
      {loading ? (
        <CircularProgress className={classes.button} />
      ) : (
        <div>
          <input
            id="avatar-upload"
            accept="image/*"
            type="file"
            onChange={handleChange}
            className={classes.input}
          />
          <label htmlFor="avatar-upload">
            <IconButton component="span" className={classes.button}>
              <AddAPhotoIcon className={classes.icon} />
            </IconButton>
          </label>
        </div>
      )}
    </div>
  );
}

export default UploadInput;
