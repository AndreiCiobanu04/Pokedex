import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PokemonList from './components/PokemonList';
import PokemonPage from './components/PokemonPage';

function App() {

  const [favorites, setFavorites] = useState([]);
  const [comments, setComments] = useState([]);

  return (
    <Router>
      <Switch>
        <Route exact path = "/">
          <PokemonList favorites={favorites} setFavorites={setFavorites}/>
        </Route>

        <Route path="/:pokemonName">
          <PokemonPage favorites={favorites} setFavorites={setFavorites} comments={comments} setComments={setComments}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
