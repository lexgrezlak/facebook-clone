import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDeletePost } from "../../hooks/post/useDeletePost";
import usePopover from "../../hooks/usePopover";

interface Props {
  id: string;
}

function PostMenu({ id }: Props) {
  const { handleDeletePost } = useDeletePost({ id });
  const {
    id: popoverId,
    handleClick,
    handleClose,
    open,
    anchorEl,
  } = usePopover({
    name: "menu",
  });

  return (
    <div>
      <IconButton
        aria-label="settings"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id={popoverId}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
      </Menu>
    </div>
  );
}

export default PostMenu;
