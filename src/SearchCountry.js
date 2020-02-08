import React, {useState, useContext, useRef, useEffect} from 'react'
import { CountriesContext } from "./CountriesContext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import {RegionContext} from './RegionContext'
import { ThemeContext } from "./DarkThemeContext";
import colors from "./colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    width: '450px',
    alignItems: 'center !important',
    flexWrap: 'nowrap',
    boxShadow: theme => `0 0 7px ${theme ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.05)'}`,
    margin: '0 !important',
    '@media(max-width:992px)': {
      width: '401px',
    },
    '@media(max-width:768px)': {
      marginBottom: '30px !important',
      maxWidth: '100%'
    }
  },
  search: {
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
      color: theme => (theme ? colors.dt : colors.li),
    },
  },
  iconGrid: {
    height: '56px',
    padding: '0 !important'
  },
  icon: {
    color: theme => (theme ? colors.dt : colors.li),
    height: '100%',
    paddingLeft: '20px',
    paddingRight: '15px',
    background: theme => (theme ? colors.de : colors.le),
    transition: 'background 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
  },
  inputGrid: {
    padding: '0 !important',
    width: '100%'
  }
})

export default function SearchCountry({setItems}) {

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
      window.sessionStorage.setItem('items', JSON.stringify(16))
      setItems(16)
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
    <Grid container spacing={1} className={classes.root}>
      <Grid item className={classes.iconGrid}>
        <FontAwesomeIcon icon={faSearch} className={classes.icon} />
      </Grid>
      <Grid item className={classes.inputGrid}> 
        <TextField
          id="filled-basic"
          label="Search for a country..."
          variant="filled"
          value={searchString}
          onChange={handleSearchChange} 
          className={classes.search}
          fullWidth
        />
      </Grid>
    </Grid>
  )
}
