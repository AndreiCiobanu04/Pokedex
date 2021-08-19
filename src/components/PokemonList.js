import React, { useEffect, useState } from 'react';
import { retrievePokemons } from '../services/PokemonService';
import { useHistory } from 'react-router';
import './PokemonList.css';
const PokemonList = ({favorites, setFavorites}) => {

    const [pokemons, setPokemons] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [tab, setTab] = useState('All');
    const history = useHistory();


    useEffect(() => {
        retrievePokemons(pageNumber*20).then((resp) => {
            setPokemons(resp.data.results)
        });
    }, [pageNumber]);


    function addFavorite(pokemon){
        setFavorites(favorites => [...favorites, pokemon]);

    }

    function removeFavorite(pokemon){
        setFavorites(favorites => favorites.filter((item) => item.name !== pokemon.name))

    }
    function goToSpecificPokemon(pokemon){
        history.push({
            pathname: `/${pokemon.name}`,
            state: {url: pokemon.url}
        })
    }



    const displayTable = (pokemons) => {
        return (
            <div className="container">
               <table className="table">
                   <thead>
                       <tr>
                           <th>Nume</th>
                           <th>Favorit</th>
                       </tr>
                   </thead>
                   <tbody>
                    {pokemons.map((pokemon, index) => (
                        <tr key={index}>
                            <td>  <span className="pokemon" onClick={() => goToSpecificPokemon(pokemon)} >{pokemon.name.toUpperCase()} </span></td>
                            <td>{favorites.find((elem) => elem.name === pokemon.name) ? <button className="btn btn-danger" onClick={() => removeFavorite(pokemon)}>Sterge Favorit</button> : 
                            <button className="btn btn-success" onClick={() => addFavorite(pokemon)}>Adauga Favorit</button>}</td>
                        </tr>
                    ))}
                   </tbody>
               </table>
            </div>  
            
        )
    }

    return (
        <div>
           <div className="tabs">
               <div className={` tab ${tab == 'All' ? 'tab-pressed' : 'tab'}`} onClick={() => setTab('All')}>All</div>
               <div className={` tab ${tab == 'Favorites' ? 'tab-pressed' : 'tab'}`} onClick={() => setTab('Favorites')}>Favorites</div>
             </div> 

            <div>
                {tab === 'All' ? displayTable(pokemons) : displayTable(favorites)}
            </div>

               { tab !== 'Favorites' && <div className="nextPrevious">
                   <button className="btn btn-info" disabled = {pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>
                   <button className="btn btn-info" onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
            

               </div>}
        </div>





    )

}



export default PokemonList;