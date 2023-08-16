import React, { useState } from 'react'
import Search from '../Search/Search'
import './pokedex.css'
import PokemonLIst from '../PokemonList/PokemonLIst'
import PokeDetails from '../PokemonDetails/PokeDetails'

const Pokedex = () => {

  const [ searchTerm, setSearchTerm ] = useState('')

  return (
    <div className='pokedex-wrapper'>
   
        <Search updateSearchTerm={setSearchTerm} />


       { (!searchTerm) ?  <PokemonLIst /> : <PokeDetails key={searchTerm} pokemonName={searchTerm} />}
    </div>
  )
}

export default Pokedex