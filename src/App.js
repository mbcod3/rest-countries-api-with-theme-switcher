import React from "react";
import { ThemeProvider } from "./DarkThemeContext";
import Navbar from "./Navbar";
import Home from "./Home";
import { Switch, Route } from "react-router-dom";
import CountryPage from './CountryPage';
import { CountriesProvider } from "./CountriesContext";
import { RegionProvider } from "./RegionContext";

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
