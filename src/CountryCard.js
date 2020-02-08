import React, {useContext} from 'react'
import { ThemeContext } from "./DarkThemeContext";
import { makeStyles } from '@material-ui/core'
import colors from "./colors";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    borderRadius: '5px',
    background: theme => (theme ? colors.de : colors.le),
    transition: 'background 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    boxShadow: theme =>
      `0 0 7px ${theme ? "rgba(0,0,0,.2)" : "rgba(0,0,0,.05)"}`,
    '@media(max-width: 575px)': {
      width: '450px',
      justifySelf: 'center',
      maxWidth: '100%'
    },
    '@media(max-width: 480px)': {
      width: '100%'
    }
  },
  media: {
    height: 160,
    '@media(max-width: 575px)': {
      height: 250
    }
  },
  cardArea: {
    '& .MuiCardActionArea-focusHighlight': {
      background: theme => (theme ? 'hsl(207, 26%, 97%)' : '')
    },
    '& .MuiTouchRipple-child': {
      background: theme => theme ? 'rgba(255,255,255, 0.57)': ''
    }
  },
  cardContent: {
    color: theme => (theme ? colors.dt : colors.lt),
    padding: '22px',
    paddingBottom: '36px',
    textDecoration: 'none',
    '@media(max-width: 575px)': {
      padding: '40px',
      paddingBottom: '70px',
      '& p': {
        fontSize: '20px',
        marginBottom: '10px'
      }
    }
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: 800,
    textDecoration: 'none !important',
    '@media(max-width: 575px)': {
      fontSize: '28px',
      marginBottom: '28px'
    }
  },
  infoTag: {
    fontWeight: 600,
  }
})

export default function CountryCard({country}) {
  const [theme] = useContext(ThemeContext);
  const classes = useStyles(theme)
  let history = useHistory();

  function handleClick(e) {
    e.preventDefault();
    setTimeout(() => history.push(`/country/${country.name}`), 450)
  }
  return (
    <Card className={classes.root}>
    <CardActionArea className={classes.cardArea} onClick={handleClick}>
      <CardMedia
        className={classes.media}
        image={country.flag}
        title={country.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
          {country.name}
        </Typography>
        <Typography variant="body1" component="p">
          <span className={classes.infoTag}>Population: </span>{`${country.population}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
        </Typography>
        <Typography variant="body1" component="p">
          <span className={classes.infoTag}>Region: </span>{country.region}
        </Typography>
        <Typography variant="body1" component="p">
          <span className={classes.infoTag}>Capital: </span>{country.capital}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}