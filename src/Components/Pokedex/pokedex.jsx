import React from 'react'
import Search from '../Search/Search'
import './pokedex.css'
import PokemonLIst from '../PokemonList/PokemonLIst'

const Pokedex = () => {
  return (
    <div className='pokedex-wrapper'>
       <h1>Pokedex</h1>
        <Search />

        <PokemonLIst />
    </div>
  )
}

export default Pokedex