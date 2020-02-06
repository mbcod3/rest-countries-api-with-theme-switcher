import React, { useContext, useRef } from "react";
import { ThemeContext } from "./DarkThemeContext";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import colors from "./colors";
import { RegionContext } from "./RegionContext";

const useStyles = makeStyles({
  filter: {
    width: "200px",
    boxShadow: theme =>
      `0 0 7px ${theme ? "rgba(0,0,0,.2)" : "rgba(0,0,0,.05)"}`,
      "& .MuiFormLabel-root": {
        color: theme => (theme ? colors.dt : colors.lt),
        marginLeft: '10px'
      },
      "& .MuiInputBase-root": {
        background: theme => (theme ? colors.de : colors.le),
        color: theme => (theme ? colors.dt : colors.lt),
      "&::before": {
        border: "none",
      },
      "&::after": {
        border: "none",
      },
    },
    '& .MuiSelect-root': {
      paddingLeft: '21px'
    },
    '& .MuiSvgIcon-root': {
      right: '12px',
      color: theme => (theme ? colors.dt : colors.lt),
    }
  },
  selectPaper: {
    background: theme => (theme ? colors.de : colors.le),
    color: theme => (theme ? colors.dt : colors.lt),
    top: "185px !important",
    "& .MuiListItem-root": {
        paddingLeft: '22px !important'
    },
  },
});

export default function FilterRegion({ setItems }) {
  const [theme] = useContext(ThemeContext);

  const classes = useStyles(theme);

  const [region, setRegion] = useContext(RegionContext);
  const regionRef = useRef(region);

  const handleSelectChange = e => {
    setRegion(e.target.value);
    setItems(16);
    regionRef.current = e.target.value;
  };

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div>
      <TextField
        select
        label="Filter by Region"
        value={regionRef.current}
        onChange={handleSelectChange}
        variant="filled"
        className={classes.filter}
        SelectProps={{
          MenuProps: {
            classes: {
              paper: classes.selectPaper,
            },
          },
        }}
      >
        {regions.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
