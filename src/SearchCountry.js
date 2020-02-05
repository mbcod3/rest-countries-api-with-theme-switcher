import React, {useState, useContext, useRef, useEffect} from 'react'
import { CountriesContext } from "./CountriesContext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import {RegionContext} from './RegionContext'
import { ThemeContext } from "./DarkThemeContext";
import colors from "./colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles({
  search: {
    width: '470px',
    boxShadow: theme => `0 0 7px ${theme ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.05)'}`,
    '& .MuiInputBase-root': {
      background: theme => (theme ? colors.de : colors.le),
      color: theme => (theme ? colors.dt : colors.li),
      '&::before':{
        border: 'none'
      },
      '&::after': {
        border: 'none'
      }
    },
    '& .MuiFormLabel-root': {
      color: theme => (theme ? colors.dt : colors.li)
    },
  },
  icon: {
    color: theme => (theme ? colors.dt : colors.li),
    
  }
})
console.log(<FontAwesomeIcon icon={faSearch} />)
export default function SearchCountry() {

  const [theme] = useContext(ThemeContext);


  const [searchString, setSearchString] = useState('')

  const [countries, setCountries] = useContext(CountriesContext);

  const [region, setRegion] = useContext(RegionContext);

  const regionRef = useRef(region)

  const classes = useStyles(theme)

  useEffect( ()=> {
    if (region !== 'Searched') regionRef.current = region
  },[region])

  const handleSearchChange = e => {
    setSearchString(e.target.value);

    let searchedCountries;

    const filterCountries = arr => (
      arr.filter(country => (
        country.name.toLowerCase().match(e.target.value.trim().toLowerCase())
      ))
    )

    if (e.target.value.length === 0) {
      setRegion(regionRef.current)
      setCountries(state => ({
        ...state,
        Searched: []
      }))
    } else {

      if (searchString.length < e.target.value.length) {
        searchedCountries = filterCountries(countries[region])
      } else {  //when backspace on search input
        searchedCountries = filterCountries(countries[regionRef.current])
      } 
      
      setRegion('Searched')
      setCountries(state => ({
        ...state,
        Searched: searchedCountries
      }))
    }
  };

  return (
    <div>
      <TextField
          id="filled-basic"
          label="Search for a country..."
          variant="filled"
          value={searchString}
          onChange={handleSearchChange} 
          className={classes.search}
          InputProps={{
            endAdornment: <InputAdornment position="end"><FontAwesomeIcon icon={faSearch} className={classes.icon} /></InputAdornment>,
          }}
        />
    </div>
  )
}
