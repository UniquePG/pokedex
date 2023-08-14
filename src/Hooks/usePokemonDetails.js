import axios from 'axios';
import  { useEffect, useState } from 'react'
import usePokemonList from './usePokemonList';

const usePokemonDetails = (id) => {
 
    // const { id } = useParams();     /* get each pokemon id from url */

    const [pokeDetails, setPokeDetails] = useState({});




    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        // console.log(response.data);

        const pokemonOfSameTypes = axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : '' }/`)

        console.log('response in pokedetails hook', response);
      

        //* Now set Pokemon details in the pokedetails object
        setPokeDetails( (state) =>  ({
            ...state,
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            height: response.data.height,
            weight: response.data.weight,
            types: response.data.types.map( (t) => t.type.name),
            
            
        }));

        pokemonOfSameTypes.then( (responce) => {
            setPokeDetails( (state) =>  ({
                ...state,
                similarPokemons: responce.data.pokemon.slice(0, 10)
            }));
        })

        console.log('response in pokedetails hook of pokemon of same type', pokemonOfSameTypes);

        
        setPokemonListState({ ...pokemonListState, type: response.data.types ? response.data.types[0].type.name : '' })
    }
    
    
    const { pokemonListState, setPokemonListState } = usePokemonList()

       //* use UseEffect hook to render pokemon details
       useEffect(()=> {
        downloadPokemon()
        // console.log('list', pokeDetails);
    },[])


    return [pokeDetails]
    

}

export default usePokemonDetails