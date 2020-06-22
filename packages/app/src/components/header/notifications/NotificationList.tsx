import React from "react";
import { Notification } from "./../../../types";

interface Props {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: Props) {
  return (
    <div>
      {notifications.map((notification) => (
        <div>{notification.message}</div>
      ))}
    </div>
  );
}
