import React, { useState, useContext, useEffect, useRef} from "react";
import { ThemeContext } from "./DarkThemeContext";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import CountryCard from "./CountryCard";
import { CountriesContext } from "./CountriesContext";
import SearchCountry from "./SearchCountry";
import {RegionContext} from './RegionContext'


export default function Home() {
  const [theme] = useContext(ThemeContext);

  const [countries] = useContext(CountriesContext);

  const [region, setRegion] = useContext(RegionContext);
  const regionRef = useRef(region)

  const [items, setItems] = useState(16)
  
  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      if (items + 16 <= countries[region].length) {
        setItems(items => items + 16)
      } else {
        setItems(items => items + (countries[region].length - items) )
      }
    }
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [countries, items, region]);


  const handleSelectChange = (e) => {
    setRegion(e.target.value)
    setItems(16)
    regionRef.current = e.target.value
  };

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div>
      <div>
        <SearchCountry />
        <TextField
          id="filled-select-currency"
          select
          label="Filter by Region"
          value={regionRef.current}
          onChange={handleSelectChange}
          helperText="Please select your currency"
          variant="filled"
        >
          {regions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        {region && countries[region].slice(0, items).map(country => (
          <CountryCard country={country} key={country.name} />
        ))}
      </div>
    </div>
  );
}
