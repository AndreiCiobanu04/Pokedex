import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PokemonList from './components/PokemonList';
import PokemonPage from './components/PokemonPage';

function App() {

  const [favorites, setFavorites] = useState(null);
  const [comments, setComments] = useState(null);


  useEffect(() => {
    
      setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
      setComments(JSON.parse(localStorage.getItem('comments')) || [])
},[])


  useEffect(() => {
    if(favorites && comments){
      localStorage.setItem("favorites", JSON.stringify(favorites));
      localStorage.setItem("comments", JSON.stringify(comments));
    }
    
  }, [favorites, comments])




  

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
