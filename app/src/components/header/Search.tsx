import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../queries";
import Results from "./search/Results";

function Search() {
  const [filter, setFilter] = useState("");
  const { data } = useQuery(GET_USERS, {
    variables: { filter },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  return (
    <div>
      <label htmlFor="search">search: </label>
      <input
        id="search"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <div>{data?.users && <Results users={data.users} />}</div>
    </div>
  );
}

export default Search;
