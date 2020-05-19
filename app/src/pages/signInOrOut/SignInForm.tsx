import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_IN, GET_ME } from "../../queries";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    await signIn({
      variables: { email, password },
      update: (store, { data }) => {
        store.writeQuery({
          query: GET_ME,
          data: {
            me: data.signIn,
          },
        });
      },
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        email:
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        password:
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
}

export default SignInForm;
