import React from "react";
import { ThemeProvider } from "./DarkThemeContext";
import Navbar from "./Navbar";
import Home from "./Home";
import { Switch, Route } from "react-router-dom";
import CountryPage from './CountryPage';
import { CountriesProvider } from "./CountriesContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Navbar />
        <Switch>
          <CountriesProvider>
            <Route exact path="/country/:name">
              <CountryPage />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </CountriesProvider>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
