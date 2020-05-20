import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ACCEPT_INVITATION,
  GET_INVITATIONS,
  SEND_INVITATION,
} from "../../../queries";

interface User {
  firstName: string;
  lastName: string;
  id: number;
}

interface Props {
  users: User[];
}

function Results({ users }: Props) {
  const [sendInvitation] = useMutation(SEND_INVITATION, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [acceptInvitation] = useMutation(ACCEPT_INVITATION, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const { data, loading } = useQuery(GET_INVITATIONS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  console.log(data, loading);
  async function addFriend(id: number) {
    const res = await sendInvitation({ variables: { id } });
    console.log(res);
  }

  async function acceptFriend(id: number) {
    const res = await acceptInvitation({ variables: { id } });
    console.log(res);
  }

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {`${user.firstName} ${user.lastName}`}
            <button type="button" onClick={() => addFriend(user.id)}>
              Add friend
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {data?.invitations.map((invitation: any) => (
          <li key={invitation.id}>
            <button type="button" onClick={() => acceptFriend(invitation.id)}>
              Accept invitation {JSON.stringify(invitation.id)} from{" "}
              {JSON.stringify(invitation.fromUserId)} to{" "}
              {JSON.stringify(invitation.toUserId)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
