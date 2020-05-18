import React, { useEffect, useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../../queries";

function SignInForm() {
  const client = useApolloClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { data }] = useMutation(SIGN_IN, {
    variables: { email, password },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (data?.signIn) {
      const { token } = data.signIn;
      localStorage.setItem("token", token);
      client.resetStore();
    }
  });

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    signIn({ variables: { email, password } });
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
