import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PokemonList from './components/PokemonList';
import PokemonPage from './components/PokemonPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = "/">
          <PokemonList />
        </Route>

        <Route path="/:pokemonName">
          <PokemonPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
