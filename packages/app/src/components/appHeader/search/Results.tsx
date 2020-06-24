import React from "react";
import { createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface User {
  firstName: string;
  lastName: string;
  id: number;
}

interface Props {
  users: User[];
}

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      border: "1px solid",
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      width: "100%",
    },
  })
);

function Results({ users }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{`${user.firstName} ${user.lastName}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
