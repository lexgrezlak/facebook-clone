import React from "react";
import { Notification } from "../../../types";
import { CircularProgress } from "@material-ui/core";
import EmptyList from "../../EmptyList";

interface Props {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: Props) {
  if (!notifications) return <CircularProgress />;
  if (notifications.length === 0) return <EmptyList text="0 notifications" />;

  return (
    <div>
      {notifications.map((notification) => (
        <div>{notification.message}</div>
      ))}
    </div>
  );
}
