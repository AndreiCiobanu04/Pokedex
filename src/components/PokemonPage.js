import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { retrieveSpecficPokemon } from '../services/PokemonService';
import defaultImg from '../images/defaultPokemon.jpg';
import moment from 'moment'
import './PokemonPage.css'

const PokemonPage = ({favorites, setFavorites, comments, setComments}) => {


    const [pokemon, setPokemon] = useState([]);
    const location = useLocation();
    const [commentForPokemon, setCommentForPokemon] = useState({});



    useEffect(() => {
        retrieveSpecficPokemon(location.state.url).then((resp) => setPokemon(resp.data))
    }, []);

    console.log(comments)


    function handleChange(event){

        setCommentForPokemon({
            ...commentForPokemon,
            [event.target.name]: event.target.value 
        })
    }

    function submitForm(event,id){
        event.preventDefault();

        if(comments[id]){
            setComments({...comments, 
                [id]: [...comments[id], {...commentForPokemon, datePosted: new Date()}]})
        }
        else {
            setComments({
                ...comments,
                [id]: [{...commentForPokemon, datePosted: new Date()}]

            });
        }

        setCommentForPokemon({
            name: '',
            seen: '',
            details: '',
        });
        

    }

    return(
        <div style={{height: '100%', marginLeft: "10px"}}>
            <h1>{pokemon?.name}</h1>
            <div className="pokemon-profile">
                
  {Object.values(pokemon?.sprites || {}).filter(Boolean).length > 0 ? 
  <img alt="Pokemon Image" src={`${Object.values(pokemon?.sprites || {}).filter(Boolean)[0]}`}/> : 
  <img alt="Pokemon Default" src={defaultImg} />}
  <div className='profile-info' style={{width:'50%'}}>
    <div className="info">
        <div>
        <p><b>Name:</b> {pokemon?.name}</p>
        <p><b>Height:</b> {pokemon?.height}</p>
        <p><b>Weight:</b> {pokemon?.weight}</p>
        </div>
        <div><b>Stats:</b> {pokemon?.stats?.map((stat, index) => (
            <li key = {index}>
                <span>{stat.stat.name}</span> : <span>{stat.base_stat}</span>
            </li>
        ))}</div>
        <div><b>Moves:</b> {pokemon?.moves?.slice(0,3).map((move, index) => (
            <p key={index}>{move.move.name}</p>
        ))}

        </div>
        </div>
        <div>
        {favorites.find((elem) => elem.name === pokemon.name) ? <button className="btn btn-danger" onClick={() => setFavorites(favorites => favorites.filter((item) => item.name !== pokemon.name))}>Sterge Favorit</button> : 
                            <button className="btn btn-success" onClick={() => setFavorites(favorites => [...favorites, pokemon])}>Adauga Favorit</button>}
        </div>
        <div>Adauga un comentariu!</div>
        <div>
       <form>
           <input name="name" type="text" value={commentForPokemon.name} placeholder="Name" onChange={(event) => handleChange(event)}></input>
           <input name="seen" type="number" placeholder="Number of pokemon seen" min="0" value={commentForPokemon.seen} onChange={(event) => handleChange(event)} />
          <div> <textarea name="details" placeholder="Details" type="text" rows="3" value={commentForPokemon.details} onChange={(event) => handleChange(event)}/>
          </div>
          <div className="float-right">
           <button className="btn btn-primary" type="submit" onClick={(event) => submitForm(event,pokemon.id)}>Post</button>
           </div>
       </form>
       </div>
        

        </div>
        

        </div>
        

        <div>
            <h3>Comentarii</h3>
       {comments[pokemon.id] && comments[pokemon.id].length > 0 ? (
           <div>
               {console.log(comments[pokemon.id].length)}
               {comments[pokemon.id].map((com, index) => (
                   <div className="comment" key = {index}>
                       <p>Name: {com.name}</p>
                       <p>Number of pokemon seen: {com.seen}</p>
                       <p style={{wordBreak:"break-all"}}>Details: {com.details}</p>
                       <p>Posted on: {moment(com.datePosted).format("DD-MM-YYYY HH:mm")}</p> 
                   </div>
               ))}
           </div>
       ): []}

        

   
    
  </div>

        </div>
    )

}

export default PokemonPage;
