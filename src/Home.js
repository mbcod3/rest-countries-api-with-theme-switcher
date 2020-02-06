import React, { useState, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "./DarkThemeContext";
import { CountriesContext } from "./CountriesContext";
import { RegionContext } from "./RegionContext";
import { makeStyles } from "@material-ui/core/styles";
import CountryCard from "./CountryCard";
import SearchCountry from "./SearchCountry";
import FilterRegion from "./FilterRegion";
import colors from "./colors";

const useStyles = makeStyles({
  root: {
    paddingTop: '50px',
    position: "relative",
    color: theme => (theme ? colors.dt : colors.lt),
    minHeight: '85vh',
    "&::after": {
      content: "''",
      position: "absolute",
      zIndex: -2,
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      background: theme => (theme ? colors.db : colors.lb),
      margin: "0 -999rem",
      padding: "0 999rem",
    },
  },
  inputsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function Home() {
  const [theme] = useContext(ThemeContext);

  const [countries] = useContext(CountriesContext);

  const [region] = useContext(RegionContext);

  const [items, setItems] = useState(16);

  const classes = useStyles(theme);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      if (items + 16 <= countries[region].length) {
        setItems(items => items + 16);
      } else {
        setItems(items => items + (countries[region].length - items));
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [countries, items, region]);

  return (
    <div className={classes.root}>
      <div className={classes.inputsContainer}>
        <SearchCountry />
        <FilterRegion setItems={setItems}/>
      </div>
      <div>
        {region &&
          countries[region]
            .slice(0, items)
            .map(country => (
              <CountryCard country={country} key={country.name} />
            ))}
      </div>
    </div>
  );
}
