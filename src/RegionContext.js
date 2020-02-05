import React,{useState, createContext, useEffect} from 'react'

export const RegionContext = createContext();

export function RegionProvider(props) {

  const [region, setRegion] = useState('')

  useEffect(() => {
    setRegion('All')
  }, [])
  return (
    <RegionContext.Provider value={[region, setRegion]}>
      {props.children}
    </RegionContext.Provider>
  )
}