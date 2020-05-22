import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../queries";
import Results from "./search/Results";
import Popper from "@material-ui/core/Popper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CircularProgress, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      maxWidth: "400px",
      margin: "0 auto",
    },
  })
);

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface UsersData {
  users: User[];
}

interface UsersVars {
  filter: string;
}

function Search() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filter, setFilter] = useState("");
  const { data } = useQuery<UsersData, UsersVars>(GET_USERS, {
    variables: { filter },
    skip: !filter,
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      className={classes.wrapper}
    >
      <TextField
        fullWidth
        variant="outlined"
        id="search"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Search someone"
        autoComplete="off"
      />
      {filter && (
        <Popper id="search-popper" open={true} anchorEl={anchorEl}>
          {data?.users ? <Results users={data.users} /> : <CircularProgress />}
        </Popper>
      )}
    </div>
  );
}

export default Search;
