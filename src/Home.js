import React, { useState, useContext} from "react";
import { ThemeContext } from "./DarkThemeContext";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import CountryCard from "./CountryCard";
import { CountriesContext } from "./CountriesContext";
import SearchCountry from "./SearchCountry";

export default function Home() {
  const [theme] = useContext(ThemeContext);

  const [countries] = useContext(CountriesContext);

  const [region, setRegion] = useState('All')


  const [selectRegion, setSelectRegion] = useState('')


  const handleSelectChange = (e) => {
    setSelectRegion(e.target.value)
    setRegion([e.target.value])
  };

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div>
      <div>
        <SearchCountry regionState={{region, setRegion}} />
        <TextField
          id="filled-select-currency"
          select
          label="Filter by Region"
          value={selectRegion}
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
          {countries[region].map(country => <CountryCard country={country} key={country.name}/>)}
      </div>
    </div>
  );
}
