import React, {useContext} from 'react'
import { CountriesContext } from "./CountriesContext";
import { useParams, Link } from 'react-router-dom';

export default function CountryPage() {
  const [countries] = useContext(CountriesContext);
  const {name} = useParams()
  const country = countries['All'].filter(country => country.name === name)
  return (
    <div>
      {country.length && <p>{country[0].name}</p>}
      <Link to="/"><button>Go back</button></Link>
    </div>
  )
}
