import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './pokedetails.css'

const PokeDetails = () => {

    const { id } = useParams();     /* get each pokemon id from url */

    const [pokeDetails, setPokeDetails] = useState({});


    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        // console.log(response.data);

        //* Now set Pokemon details in the pokedetails object
        setPokeDetails( {
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            height: response.data.height,
            weight: response.data.weight,
            types: response.data.types.map( (t) => t.type.name)
        })
    }

    //* use UseEffect hook to render pokemon details
    useEffect(()=> {
        downloadPokemon()
    },[])

    console.log(pokeDetails);


  return (
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
  )
}

export default PokeDetails