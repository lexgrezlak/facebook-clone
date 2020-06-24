import React from "react";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

interface Props {
  handleClick: () => void;
}

export default function UnlikeButton({ handleClick }: Props) {
  return (
    <IconButton onClick={handleClick}>
      <FavoriteIcon />
    </IconButton>
  );
}
