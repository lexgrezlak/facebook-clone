import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../queries";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CircularProgress, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      maxWidth: "400px",
      width: "100%",
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
  const [filter, setFilter] = useState("");
  const { data, loading } = useQuery<UsersData, UsersVars>(GET_USERS, {
    variables: { filter },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    notifyOnNetworkStatusChange: true, // so that loading isn't always true when user not found
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Autocomplete
      className={classes.wrapper}
      id="asynchronous-demo"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option: User, value: User) =>
        option.firstName === value.firstName &&
        option.lastName === value.lastName
      }
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      options={data?.users || []}
      loading={loading}
      onChange={(event: any, user: any) => navigate(`/users/${user.id}`)}
      noOptionsText={"User not found"}
      renderInput={(params) => (
        <TextField
          {...params}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          variant="outlined"
          fullWidth
          style={{ backgroundColor: "white" }}
          placeholder="Search someone"
          autoComplete="off"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default Search;
