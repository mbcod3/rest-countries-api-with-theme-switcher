import React,{useState, createContext, useEffect} from 'react'
import axios from 'axios';

export const CountriesContext = createContext();

export function CountriesProvider(props) {
  const [countries, setCountries] = useState(() => {
    let val;
    try {
      val = JSON.parse(window.localStorage.getItem('countries') || [])
    }
    catch (e) {
      val = {All: []}
    }
    return val
  })

  useEffect(() => {
    if (countries.All.length === 0) {
      axios.get('https://restcountries.eu/rest/v2/all')
      .then((data) => {
        setCountries({
          All: data.data,
          Africa: data.data.filter(country => country.region === "Africa"),
          Americas: data.data.filter(country => country.region === "Americas"),
          Asia: data.data.filter(country => country.region === "Asia"),
          Europe: data.data.filter(country => country.region === "Europe"),
          Oceania: data.data.filter(country => country.region === "Oceania"),
          Searched: []
        })
      })
      .catch(err => {
        alert(err)
      })
    } else {
      if (countries.Searched.length === 0) window.localStorage.setItem('countries', JSON.stringify(countries))
    }
  }, [countries])

  return (
    <CountriesContext.Provider value={[countries, setCountries]}>
      {props.children}
    </CountriesContext.Provider>
  )
}


