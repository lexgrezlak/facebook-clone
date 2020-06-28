import { useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../graphql/queries";
import { Notification } from "../types";

interface NotificationsData {
  notifications: Notification[];
}

export function useNotifications() {
  const { data } = useQuery<NotificationsData>(GET_NOTIFICATIONS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const notifications = data?.notifications;

  return notifications;
}
