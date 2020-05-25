import { useMutation, useQuery } from "@apollo/client";
import {
  REMOVE_REQUEST,
  GET_IS_FRIEND,
  REMOVE_FRIENDSHIP,
  SEND_INVITATION,
} from "../queries";

interface Props {
  id: number;
}

interface IsFriendData {
  isFriend: boolean;
}

interface IsFriendVars {
  id: number;
}

export const useFriendButtonManagement = ({ id }: Props) => {
  const { data } = useQuery<IsFriendData, IsFriendVars>(GET_IS_FRIEND, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    variables: { id },
  });

  const [sendInvitation] = useMutation(SEND_INVITATION, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function addFriend() {
    await sendInvitation({
      variables: { id },
      update: (store, { data }) => {
        store.writeQuery({
          query: GET_IS_FRIEND,
          variables: { id },
          data: {
            isFriend: false,
          },
        });
      },
    });
  }

  const [removeFriendship] = useMutation(REMOVE_FRIENDSHIP, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function removeFriend() {
    return removeFriendship({
      variables: { id },
      update: (store, { data }) => {
        store.writeQuery({
          query: GET_IS_FRIEND,
          variables: { id },
          data: {
            isFriend: null,
          },
        });
      },
    });
  }

  const [removeRequest] = useMutation(REMOVE_REQUEST, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function cancelRequest() {
    return removeRequest({
      variables: { id },
      update: (store, { data }) => {
        store.writeQuery({
          query: GET_IS_FRIEND,
          variables: { id },
          data: {
            isFriend: null,
          },
        });
      },
    });
  }

  const isFriend = (data?.isFriend ?? null) as null | true | false;

  return { isFriend, addFriend, removeFriend, cancelRequest };
};
