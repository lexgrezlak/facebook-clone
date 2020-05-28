import { Avatar, withStyles } from "@material-ui/core";

export const StyledProfileAvatar = withStyles((theme) => ({
  root: {
    border: "thick solid #f0f0f0",
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}))(Avatar);
