import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../queries";
import Results from "./search/Results";
import Popper from "@material-ui/core/Popper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MyTextField from "../MyTextField";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      maxWidth: "400px",
      margin: "0 auto",
    },
    popper: {
      // width: "100%",
    },
  })
);

function Search() {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const { data } = useQuery(GET_USERS, {
    variables: { filter },
    skip: !filter,
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

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
        placeholder="Search"
        autoComplete="off"
      />
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        className={classes.popper}
      >
        {data?.users ? <Results users={data.users} /> : <div>nothing yet</div>}
      </Popper>
    </div>
  );
}

export default Search;
