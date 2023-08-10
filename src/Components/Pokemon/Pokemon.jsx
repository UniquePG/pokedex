import React from 'react'
import './pokemon.css'

const Pokemon = ({name, image}) => {
  return (
    <div className='pokemon'>
        <div className='poke-name'>{name}</div>

        <div> 
          <img className='pokemon-img' src={image} />
        </div>

    </div>
  )
}

export default Pokemon