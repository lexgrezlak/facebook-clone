import React, { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../../queries";

function SignInForm() {
  const client = useApolloClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn] = useMutation(SIGN_IN, {
    variables: { email, password },
  });

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await signIn({ variables: { email, password } });
    const { token } = response.data.signIn;
    localStorage.setItem("token", token);
    await client.resetStore();
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
