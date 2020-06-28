import React from "react";
import { Notification } from "../../../types";
import { CircularProgress, List } from "@material-ui/core";
import EmptyList from "../../EmptyList";
import NotificationItem from "./NotificationItem";

interface Props {
  notifications: Notification[] | undefined;
}

export default function NotificationList({ notifications }: Props) {
  if (!notifications) return <CircularProgress />;
  if (notifications.length === 0) return <EmptyList text="0 notifications" />;

  return (
    <List>
      {notifications.map((notification) => (
        <NotificationItem notification={notification} key={notification.id} />
      ))}
    </List>
  );
}
