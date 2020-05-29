import React from "react";
import SignOutButton from "../pages/home/SignOutButton";
import { Link } from "react-router-dom";
import {
  AppBar,
  createStyles,
  fade,
  IconButton,
  Theme,
  Toolbar,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./header/Search";
import FriendRequests from "./FriendRequests";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: "none",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      maxWidth: "400px",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        // width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="home"
            component={Link}
            to="/"
          >
            <FacebookIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="search" color="inherit">
            <SearchIcon fontSize="large" />
          </IconButton>
          <Search />
          <FriendRequests />
          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <SignOutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;