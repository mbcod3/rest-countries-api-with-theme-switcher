import React, {useState, useContext, useRef, useEffect} from 'react'
import { CountriesContext } from "./CountriesContext";
import TextField from "@material-ui/core/TextField";
import {RegionContext} from './RegionContext'

export default function SearchCountry() {

  const [searchString, setSearchString] = useState('')

  const [countries, setCountries] = useContext(CountriesContext);

  const [region, setRegion] = useContext(RegionContext);

  const regionRef = useRef(region)

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
        />
    </div>
  )
}
