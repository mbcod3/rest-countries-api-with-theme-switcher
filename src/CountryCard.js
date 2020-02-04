import React from 'react'
import { Link } from 'react-router-dom'

export default function CountryCard({country}) {
  return (
    <div >
      <Link to={`/country/${country.name}`}>
      <p>{country.name}</p>
      </Link>
    </div>
  )
}
