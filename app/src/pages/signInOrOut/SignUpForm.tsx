import React, { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_UP } from "../../queries";

function SignUpForm() {
  const client = useApolloClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signUp] = useMutation(SIGN_UP, {
    variables: { name, email, password },
  });

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await signUp({ variables: { name, email, password } });
    const { token } = response.data.signUp;
    localStorage.setItem("token", token);
    await client.resetStore();
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>{" "}
      <div>
        email:
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>{" "}
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

export default SignUpForm;
