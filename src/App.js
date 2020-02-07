import React from "react";
import { ThemeProvider } from "./DarkThemeContext";
import Navbar from "./Navbar";
import Home from "./Home";
import { Switch, Route } from "react-router-dom";
import CountryPage from "./CountryPage";
import { CountriesProvider } from "./CountriesContext";
import { RegionProvider } from "./RegionContext";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
  makeStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles({
  "@global": {
    html: {
      overflowX: 'hidden',
      scrollBehavior: 'smooth'
    },
    body: {
      overflowX: 'hidden',
      fontFamily: "Nunito Sans, sans serif",
      paddingRight: '0 !important'
    },
    '.container': {
      maxWidth: '100%',
      paddingRight: '15px',
      paddingLeft: '15px',
      marginRight: 'auto',
      marginLeft: 'auto',
      '@media(min-width: 576px)': {
        maxWidth: '540px',
      },
      '@media (min-width: 768px)': {
        maxWidth: '720px',
      },
      '@media (min-width: 992px)': {
        maxWidth: '960px',
      },
      '@media (min-width: 1200px)': {
        maxWidth: '1140px',
      },
      '@media (min-width: 1400px)': {
        maxWidth: '1300px'
      },
      '@media (min-width: 1600px)': {
        maxWidth: '1400px'
      }
    },
    'img-fluid': {
      maxWidth: '100%',
      height: 'auto'
    }
  },
});

let theme = createMuiTheme({
  typography: {
    fontFamily: "Nunito Sans",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": ["Nunito Sans"],
      },
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <div className="container">
        <ThemeProvider>
          <Navbar />
          <Switch>
            <CountriesProvider>
              <RegionProvider>
                <Route exact path="/country/:name">
                  <CountryPage />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
              </RegionProvider>
            </CountriesProvider>
          </Switch>
        </ThemeProvider>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
