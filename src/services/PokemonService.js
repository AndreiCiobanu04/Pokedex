import axios from "axios";


export const retrievePokemons = (offset) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
}


export const retrieveSpecficPokemon = (url) => {
    return axios.get(`${url}`);
}