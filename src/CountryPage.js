import React, { useContext } from "react";
import { CountriesContext } from "./CountriesContext";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import colors from "./colors";
import { ThemeContext } from "./DarkThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  root: {
    paddingTop: "50px",
    position: "relative",
    color: theme => (theme ? colors.dt : colors.lt),
    minHeight: "calc(100vh - 122px)",
    "&::after": {
      content: "''",
      position: "absolute",
      zIndex: -2,
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      background: theme => (theme ? colors.db : colors.le),
      margin: "0 -999rem",
      padding: "0 999rem",
      transition: "background 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },
  },
  btn: {
    outline: "none",
    border: "none",
    background: theme => (theme ? colors.de : colors.le),
    padding: "10px 34px",
    borderRadius: "5px",
    boxShadow: theme =>
      `0 0 7px ${theme ? "rgba(0,0,0,.2)" : "rgba(0,0,0,.05)"}`,
    color: theme => (theme ? colors.dt : colors.lt),
    fontSize: "16px",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "64px",
    "& svg": {
      marginRight: "10px",
    },
    "&:hover, &:focus": {
      background: theme => (theme ? "hsl(207, 26%, 32%)" : "rgba(0,0,0,.05)"),
    },
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'space-between',
    '@media(max-width:992px)': {
      flexDirection: 'column'
    }
  },
  flag: {
    width: '560px',
    height: 'auto',
    maxWidth: '100%',
    '@media(max-width:1400px)': {
      width: '520px'
    },
    '@media(max-width:1200px)': {
      width: '475px'
    },
    '@media(max-width:992px)': {
      width: '560px',
      marginBottom: '50px'
    },
  },
  countryContainer: {
    width: '575px',
    maxWidth: '100%',
    '@media(max-width:1400px)': {
      width: '475px'
    },
    '@media(max-width:1200px)': {
      width: '420px'
    },
    '@media(max-width:992px)': {
      width: '560px',
    }
  },
  countryInfoContainer: {
    display: "flex",
    justifyContent: 'space-between',
    marginBottom: '20px',
    '@media(max-width:576px)': {
      flexDirection: 'column'
    }
  },
  borderContainer: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  borderTag: {
    fontWeight: 800, 
    marginBottom: '10px',
    display: 'inline-block'
  },
  border: {
    padding: '5px 24px',
    borderRadius: '3px',
    marginRight: '10px',
    background: theme => theme ? colors.de : '',
    boxShadow: theme =>
      `0 0 7px ${theme ? "rgba(0,0,0,.4)" : "rgba(0,0,0,.1)"}`,
    marginBottom: '10px' 
  }
});

export default function CountryPage() {
  const [countries] = useContext(CountriesContext);
  const [theme] = useContext(ThemeContext);

  const {goBack} = useHistory()

  const { name } = useParams();
  const country = countries["All"].filter(country => country.name === name);

  const classes = useStyles(theme);

  const borderCountry = abbr => {
    const name = countries["All"].filter(country => country.alpha3Code === abbr)
    return name[0].name
  }
  return (
    <div className={classes.root}>
      <button className={classes.btn} onClick={goBack}>
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
        Back
      </button>
      <div className={classes.content}>
        <img src={country[0].flag} alt="flag" className={classes.flag}/>
        <div className={classes.countryContainer}>
          <h2>{country[0].name}</h2>
          <div className={classes.countryInfoContainer}>
            <div>
              <p>
                <span style={{ fontWeight: 800 }}>Native Name: </span>
                {country[0].nativeName}
              </p>
              <p>
                <span style={{ fontWeight: 800 }}>Population: </span>
                {`${country[0].population}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
              </p>
              <p>
                <span style={{ fontWeight: 800 }}>Region: </span>
                {country[0].region}
              </p>
              <p>
                <span style={{ fontWeight: 800 }}>Sub Region: </span>
                {country[0].subregion}
              </p>
              <p>
                <span style={{ fontWeight: 800 }}>Capital: </span>
                {country[0].capital}
              </p>
            </div>
            <div>
              <p>
                <span style={{ fontWeight: 800 }}>Top Level Domain: </span>
                {country[0].topLevelDomain}
              </p>
              <p>
                <span style={{ fontWeight: 800 }}>Currencies: </span>
                {country[0].currencies[0].name}
              </p>
              <p>
                <span style={{ fontWeight: 800 }}>Languages: </span>
                {country[0].languages.map((language, i, arr) => (
                  <span key={i}>{`${language.name}${i === arr.length - 1 ? '' : ', '}`}</span>
                ))}
              </p>
            </div>
          </div>
          <div>
            <span className={classes.borderTag}>Border Countries: &nbsp;</span>
            <div className={classes.borderContainer}>
              {country[0].borders.length ? country[0].borders.map((border, i) => (
                <span className={classes.border} key={i}>{borderCountry(border)}</span>
              )) : <span style={{marginBottom: '10px'}}> None</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
