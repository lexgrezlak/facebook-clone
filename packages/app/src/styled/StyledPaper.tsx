import { Paper, withStyles } from "@material-ui/core";

export const StyledPaper = withStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}))(Paper);
