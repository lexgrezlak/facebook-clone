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

  async function addFriend(id: number) {
    const res = await sendInvitation({ variables: { id } });
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
    </div>
  );
}

export default Results;
