import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ACCEPT_INVITATION, GET_INVITATIONS } from "../queries";

function FriendInvitations() {
  const { data } = useQuery(GET_INVITATIONS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [acceptInvitation] = useMutation(ACCEPT_INVITATION, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function acceptFriend(id: number) {
    const res = await acceptInvitation({ variables: { id } });
    console.log(res);
  }

  return (
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
  );
}

export default FriendInvitations;
