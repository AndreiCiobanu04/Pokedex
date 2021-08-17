import React, { useEffect, useState } from 'react';
import { retrievePokemons } from '../services/PokemonService';
import { useHistory } from 'react-router';

const PokemonList = () => {

    const [pokemons, setPokemons] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [favorites, setFavorites] = useState([]);
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
    function goToSpecificPokemon(name){
        history.push(`/${name}`)
    }



    const displayTable = (pokemons) => {
        return (
            <div className="container">
               <table className="table">
                   <thead>
                       <tr>
                           <th>Nume</th>
                           <th>Adauga/Sterge Favorit</th>
                       </tr>
                   </thead>
                   <tbody>
                    {pokemons.map((pokemon, index) => (
                        <tr key={index}>
                            <td>  <span style={{cursor: "pointer"}} onClick={() => goToSpecificPokemon(pokemon.name)} >{pokemon.name} </span></td>
                            <td>{favorites.find((elem) => elem.name === pokemon.name) ? <button onClick={() => removeFavorite(pokemon)}>Sterge Favorit</button> : 
                            <button onClick={() => addFavorite(pokemon)}>Adauga Favorit</button>}</td>
                        </tr>
                    ))}
                   </tbody>
               </table>
            </div>  
            
        )
    }

    return (
        <div>
           <div>
               <button onClick={() => setTab('All')}>All</button>
               <button onClick={() => setTab('Favorites')}>Favorites</button>
             </div> 

            <div>
                {tab === 'All' ? displayTable(pokemons) : displayTable(favorites)}
            </div>

               { tab !== 'Favorites' && <div style={{margin: "0 auto", display:"flex"}}>
                   <button disabled = {pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>
                   <button onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
            

               </div>}
        </div>





    )

}



export default PokemonList;