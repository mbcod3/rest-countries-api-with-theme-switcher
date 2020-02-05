import React, { useContext } from "react";
import { ThemeContext } from "./DarkThemeContext";
import { makeStyles } from "@material-ui/core/styles";
import colors from "./colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as fasFaMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as farFaMoon } from "@fortawesome/free-regular-svg-icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    color: theme => (theme ? colors.dt : colors.lt),
    "&::after": {
      content: "''",
      boxShadow: "0px 3px 5px rgba(0,0,0,.05)",
      position: "absolute",
      zIndex: -2,
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      background: theme => (theme ? colors.de : colors.le),
      margin: "0 -999rem",
      padding: "0 999rem",
    },
  },
  btn: {
    color: "inherit",
    border: "none",
    background: "inherit",
    fontSize: "16px",
    fontFamily: "inherit",
    fontWeight: 600,
    cursor: "pointer",
    outline: 'none'
  },
});

export default function Navbar() {
  const [theme, setTheme] = useContext(ThemeContext);

  const classes = useStyles(theme);

  const handleClick = () => {
    setTheme(theme => !theme);
  };
  return (
    <nav className={classes.root}>
      <h2>Where in the world?</h2>
      <button onClick={handleClick} className={classes.btn}>
        <FontAwesomeIcon icon={theme ? fasFaMoon : farFaMoon} /> Dark Mode
      </button>
    </nav>
  );
}
