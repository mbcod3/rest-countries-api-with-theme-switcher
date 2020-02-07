import React, { useState, useContext, useEffect } from "react";
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
    minHeight: "calc(100vh - 152px)",
    paddingBottom: '30px',
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
      transition: 'background 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
    },
  },
  inputsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  countriesContainer: {
    marginTop: '50px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '75px'
  }
});

export default function Home() {
  const [theme] = useContext(ThemeContext);

  const [countries] = useContext(CountriesContext);

  const [region] = useContext(RegionContext);

  const [items, setItems] = useState(() => (
    JSON.parse(window.sessionStorage.getItem('items') || 16) 
  ));

  const classes = useStyles(theme);

  useEffect(() => {
    window.sessionStorage.setItem('items', JSON.stringify(16))

    return () => window.sessionStorage.setItem('items', JSON.stringify(16))
  }, [])

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      if (items + 16 <= countries[region].length) {
        window.sessionStorage.setItem('items', JSON.stringify(items + 16))
        setItems(items => items + 16);
        document.documentElement.scrollTop += 600
      } else {
        window.sessionStorage.setItem('items', JSON.stringify(items + (countries[region].length - items)))
        setItems(items => items + (countries[region].length - items));
        document.documentElement.scrollTop += 600
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [countries, items, region]);

  return (
    <div className={classes.root}>
      <div className={classes.inputsContainer}>
        <SearchCountry setItems={setItems}/>
        <FilterRegion setItems={setItems}/>
      </div>
      <div className={classes.countriesContainer}>
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
