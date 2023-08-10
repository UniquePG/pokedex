import React, { useEffect, useState } from 'react'
import './pokemonlist.css'
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

const PokemonLIst = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const POKEDEX_API = 'https://pokeapi.co/api/v2/pokemon/';

    async function downloadPokemon() {

        const response = await axios.get(POKEDEX_API);  // this downloads the list of 20 pokemons

        // console.log(response.data);
        const pokemonResult = response.data.results;    // it gives array of all pokemons

        // iterating over the array of pokemons, using their url, to array of promises
        //that will download 20 pokemons
        const pokemonResultsPromise = pokemonResult.map( (pokemon) => axios.get(pokemon.url))   // it gives details of each pokemon and returns pomisearray

        //* passing that promises array to axios.all .all is the axios method that takes the promiseArray and jab saare promise resolve ho jayenge tb to result laake de dega
        const pokemonData = await axios.all(pokemonResultsPromise)    // array of 20 pokemons data 
        // console.log(pokemonData);

        //* now iterate the on the data of each pokemon and extract their id, name, image, and types
        const PokeListResult = pokemonData.map( (pokeData) => {
            const pokemon = pokeData.data;

            // console.log(pokemon.sprites.other.dream_world.front_default);
            return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                    types: pokemon.types
            }
        })

        console.log(PokeListResult);
        setPokemonList(PokeListResult)     // set this pokemon list in our state variable

        // console.log('image is' ,res.image);
        
        setIsLoading(false)
    }

useEffect( ()=> {

    downloadPokemon();

}, [])      //* it is called only on first component render


  return (
    <div className='pm-list-wrapper'>
        <h3>Pokemon List</h3>

        <div>
            {
                (isLoading) ? 'Loading....' :  
                    pokemonList.map( (p) => <Pokemon name={p.name} image={p.image} key={p.id}/> )
                
            }
        </div>
    </div>
  )
}

export default PokemonLIst