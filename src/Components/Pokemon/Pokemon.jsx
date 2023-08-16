import React, { useEffect } from 'react'
import './pokemon.css'
import { Link } from 'react-router-dom'

const Pokemon = ({name, image, id}) => {


  return (
    <div className='pokemon'>

      <Link to={`/pokemon/${id}`} style={{textDecoration: 'none', color: 'black'}}  >    {/*  Link tag for go the the every pokemon details */}
        <div className='poke-name'>{name}</div>

        <div> 
          <img className='pokemon-img' src={image} />
        </div>
      </Link>

    </div>
  )
}

export default Pokemon