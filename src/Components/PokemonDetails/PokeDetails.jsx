import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './pokedetails.css'
import usePokemonList from '../../Hooks/usePokemonList';
import usePokemonDetails from '../../Hooks/usePokemonDetails';
import useSimilarPokeData from '../../Hooks/useSimilarPokeData';

const PokeDetails = () => {

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
    


    const [ pokeDetails ] = usePokemonDetails(id)

    // const [similarPokeData,similarpokePromise ] = useSimilarPokeData()

    // console.log(similarpokePromise);

    // console.log("pokemon details",pokeDetails.types);
    // console.log("pokemon list state",pokemonListState);

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
                            pokeDetails.types && pokeDetails.types.map( (t) => <div key={t}> {t} </div> )
                        } 
                </div>

            </div>   
    </div>

{ pokeDetails.types && pokeDetails.similarPokemons &&
    <div>
           <h2> some more {pokeDetails.types[0]} type pokemon </h2>
           <div>
                <ul>
                    {
                    pokeDetails.similarPokemons.map( (p, index)=> <li key={index} >{p.pokemon.name} </li> )
                    }
                </ul>

            </div>
    </div>

}
</div>
  )
}

export default PokeDetails