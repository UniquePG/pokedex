import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList( ){

        // const [pokemonList, setPokemonList] = useState([]);
        // const [isLoading, setIsLoading] = useState(true);

        // const [POKEDEX_API, setPokdexurl] = useState('https://pokeapi.co/api/v2/pokemon/');

        // const [prevUrl, setPrevUrl] = useState('')
        // const [nextUrl, setNextUrl] = useState('')

    //! Maintain single state variable for all states
    const [pokemonListState, setPokemonListState] = useState( {
        pokemonList: [],
        isLoading: true,
        POKEDEX_API: 'https://pokeapi.co/api/v2/pokemon/',
        prevUrl: '',
        nextUrl: '',
        type: ''
    })


    async function downloadPokemon() {

        // setIsLoading(true)
        setPokemonListState( (state) =>( { ...state, isLoading: true}));

        const response = await axios.get(pokemonListState.POKEDEX_API);  // this downloads the list of 20 pokemons

        // console.log(response.data);
        const pokemonResult = response.data.results;    // it gives array of all pokemons


        // setPrevUrl(response.data.previous);
        // setNextUrl(response.data.next);

        console.log("response is", response.data);
    //! IMPORTANT-> agr hme ek sath (do rerender ke bich me) ek he state variable ko update karna hai to hme usme ek callback func. pass karna hoga aur usme ek arguement(state) dena hoga jo uss state ke current value ko dikhayega then hm apne state variable ko updete krenge
        setPokemonListState((state) =>( {
            ...state, 
            prevUrl: response.data.previous, 
            nextUrl: response.data.next
        }))

        // iterating over the array of pokemons, using their url, to array of promises
        //that will download 20 pokemons
            //* normal pokemon api (without type)
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

            // setPokemonList(PokeListResult)     // set this pokemon list in our state variable
            // setIsLoading(false)


        //! IMPORTANT
            setPokemonListState( (state)=> ({
                ...state, 
                pokemonList: PokeListResult,
                isLoading: false
            }))
        
    }


    useEffect( ()=> {
        downloadPokemon();

    }, [pokemonListState.POKEDEX_API])      //* it is called only on first component render


    return {                        // we can also use array to return variables
        pokemonListState,
        setPokemonListState
    }

}

export default usePokemonList;