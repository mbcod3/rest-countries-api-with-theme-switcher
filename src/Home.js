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
    '@media(max-width:768px)': {
      flexDirection: 'column'
    }
  },
  countriesContainer: {
    marginTop: '50px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '75px',
    '@media(max-width:1599px)': {
      gap: '50px'
    },
    '@media(max-width:1200px)': {
      gridTemplateColumns: 'repeat(3,1fr)'
    },
    '@media(max-width:992px)': {
      gap: '25px'
    },
    '@media(max-width: 768px)': {
      gridTemplateColumns: 'repeat(2,1fr)',
    },
    '@media(max-width: 575px)': {
      gridTemplateColumns: '1fr',
      rowGap: '75px'
    }
  }
});

export default function Home() {
  const [theme] = useContext(ThemeContext);

  const [countries] = useContext(CountriesContext);

  const [region] = useContext(RegionContext);

  const [items, setItems] = useState(() => (
    JSON.parse(window.sessionStorage.getItem('items') || calcItems()) 
  ));

  const classes = useStyles(theme);

  function calcItems() {
    let itemN;
    if (window.innerWidth < 576) itemN = 4
    else if (window.innerWidth < 768) itemN = 8
    else if (window.innerWidth < 1200) itemN = 12
    else itemN = 16
    return itemN
  }

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      if (items + 16 <= countries[region].length) {
        window.sessionStorage.setItem('items', JSON.stringify(items + calcItems()))
        setItems(items => items + calcItems());
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
