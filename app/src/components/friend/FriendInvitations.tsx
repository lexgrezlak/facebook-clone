import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ACCEPT_INVITATION, GET_INVITATIONS } from "../../queries";

interface Invitation {
  id: number;
  fromUserId: number;
}

interface InvitationsData {
  invitations: Invitation[];
}

function FriendInvitations() {
  const { data } = useQuery<InvitationsData>(GET_INVITATIONS, {
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
    return acceptInvitation({
      variables: { id },
      update: (store, { data: { acceptInvitation } }) => {
        const invitationsData = store.readQuery({
          query: GET_INVITATIONS,
        }) as InvitationsData;

        // update friend requests
        store.writeQuery({
          query: GET_INVITATIONS,
          data: {
            invitations: invitationsData.invitations.filter(
              (invitation) => invitation.id !== id
            ),
          },
        });
      },
    });
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
