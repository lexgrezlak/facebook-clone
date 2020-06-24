import React from "react";
import { IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

interface Props {
  handleClick: () => void;
}

export default function LikeButton({ handleClick }: Props) {
  return (
    <IconButton onClick={handleClick}>
      <FavoriteBorderIcon />
    </IconButton>
  );
}
