import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton, Popover } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../../graphql/queries";
import NotificationList from "./notifications/NotificationList";
import usePopover from "../../hooks/usePopover";
import { useNotifications } from "../../hooks/useNotifications";

export default function Notifications() {
  const notifications = useNotifications();

  const { id, open, anchorEl, handleClose, handleClick } = usePopover({
    name: "notifications",
  });

  return (
    <div>
      <IconButton
        aria-label="show chats"
        edge="end"
        color="inherit"
        onClick={handleClick}
      >
        <NotificationsIcon fontSize="large" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <NotificationList notifications={notifications} />
      </Popover>
    </div>
  );
}
