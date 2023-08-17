import axios from 'axios';
import  { useEffect, useState } from 'react'


const usePokemonDetails = (id, pokemonName) => {
 
    // const { id } = useParams();     /* get each pokemon id from url */

    const [pokeDetails, setPokeDetails] = useState({});

    // const [similarPokemons, setSimilarPokemons ] = useState({});

    async function downloadPokemon() {

        try {
            
            let response;
    
            if(pokemonName){
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
            }else {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
            }
    
    
            // console.log(response.data);
    
            const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : '' }/`)
    
            // console.log('response in pokedetails hook', response);
          
    
            //* Now set Pokemon details in the pokedetails object
            setPokeDetails( (state) =>  ({
                ...state,
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                height: response.data.height,
                weight: response.data.weight,
                types: response.data.types.map( (t) => t.type.name),
                similarPokemons: pokemonOfSameTypes.data.pokemon.slice(0, 10)
                
            }));
    
            //* this is another methoid to set similerPokemons in pokedetails object
            // pokemonOfSameTypes.then( (responce) => {
            //     setPokeDetails( (state) =>  ({
            //         ...state,
            //         similarPokemons: responce.data.pokemon.slice(0, 10)
            //     }));
            // })
    
            // console.log('response in pokedetails hook of pokemon of same type', pokemonOfSameTypes);
    
            
            setPokemonListState({ ...pokemonListState, type: response.data.types ? response.data.types[0].type.name : '' })
      
        } catch (error) {
            console.log("something went wrong");
        }


    
    }
   
    
    
    const { pokemonListState, setPokemonListState } = useState({})

    // // similar pokemon
    //  function similarPokemon() {
        
    //     console.log("poke details inside", pokeDetails.similarPokemons);
    // }



       //* use UseEffect hook to render pokemon details
    useEffect(()=> {

        downloadPokemon();
        
        // console.log('list', pokeDetails);
    },[id])


    return [pokeDetails]
    

}

export default usePokemonDetails;