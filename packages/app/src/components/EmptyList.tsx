import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

interface Props {
  text: string;
}

export default function EmptyList({ text }: Props) {
  return (
    <List>
      <ListItem>
        <ListItemText primary={text} />
      </ListItem>
    </List>
  );
}
