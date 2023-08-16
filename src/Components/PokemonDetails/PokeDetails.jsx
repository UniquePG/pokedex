import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './pokedetails.css'
import usePokemonList from '../../Hooks/usePokemonList';
import usePokemonDetails from '../../Hooks/usePokemonDetails';
import Pokemon from '../Pokemon/Pokemon';



const PokeDetails = ({pokemonName}) => {

    const { id } = useParams();     /* get each pokemon id from url */

    // const [pokeDetails, setPokeDetails] = useState({});


    // async function downloadPokemon() {
    //     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    //     // console.log(response.data);

    //     //* Now set Pokemon details in the pokedetails object
    //     setPokeDetails( {
    //         name: response.data.name,
    //         image: response.data.sprites.other.dream_world.front_default,
    //         height: response.data.height,
    //         weight: response.data.weight,
    //         types: response.data.types.map( (t) => t.type.name)
    //     })
    // }





    //* use UseEffect hook to render pokemon details
    // useEffect(()=> {
    //     downloadPokemon()
    // },[])

    // console.log(pokeDetails);
    


    const [ pokeDetails ] = usePokemonDetails(id, pokemonName)


    const { pokemonListState } = usePokemonList();

    // console.log("similar pokemons", pokeDetails.similarPokemons);
    const [similarPokeData, setSimilarPokeData ] = useState({});
    
    async function downloadSimilarPokemon() {
        console.log("similar pokemons", pokeDetails.similarPokemons);

        const similarPokemons = pokeDetails.similarPokemons.map((p)=> axios.get(p.pokemon.url));

        const similarpokemonResult = await axios.all(similarPokemons)

        const similarPokeData = similarpokemonResult.map((poke)=> {
            const similarPokemon = poke.data;

            return {
                id: similarPokemon.id,
                name: similarPokemon.name,
                image: (similarPokemon.sprites.other) ? similarPokemon.sprites.other.dream_world.front_default : similarPokemon.sprites.front_shiny
            }
        })

        console.log("pokemon response", similarPokeData);

        // now set this data into object of state variable
        setSimilarPokeData({
           pokemons: similarPokeData
        }) 
        
    }

    console.log("similar.....", similarPokeData.pokemons);

    useEffect( ()=> {
        downloadSimilarPokemon();
        // console.log('similarrrr', similarPokeData.pokemons );
    },[pokeDetails, id])



  return (
<div>
    <div className='pokemon-details-wrapper'>
            <div className='poke-img'>
                <img src={pokeDetails.image} />
            </div>

            <div className='poke-basic-details'>

                <div className='pokemon-name'>{pokeDetails.name} </div>
                <div className='pokemon-weight'> Height: {pokeDetails.height}</div>
                <div className='pokemon-weight'> weight: {pokeDetails.weight}</div>
                <div className='poke-types'>                
                        {/* Pokemon-Type:  */}
                        {
                            pokeDetails.types && pokeDetails.types.map((t, i) => <div key={i}> {t} </div> )
                        } 
                </div>

            </div>   
    </div>

{ pokeDetails.types && pokeDetails.similarPokemons && similarPokeData.pokemons &&
    <div>
           <h2 className='similar-poke-heading'> some more {pokeDetails.types[0]} type pokemon </h2>
           {/* <div>
                <ul>
                    {
                    pokeDetails.similarPokemons.map( (p, index)=> <li key={index} >{p.pokemon.name} </li> )
                    }
                </ul>
            </div> */}


        <div className='pokemon-wrapper'>
        
            {
                (pokemonListState.isLoading) ? 'Loading....' :  
                similarPokeData.pokemons.map((p) => ( 
                    <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} /> 

                ))
                
            }
        
        

        </div>
    </div>

}
</div>
  )
}

export default PokeDetails