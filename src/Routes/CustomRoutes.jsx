import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PokemonLIst from '../Components/PokemonList/PokemonLIst'
import PokeDetails from '../Components/PokemonDetails/PokeDetails'
import Pokedex from '../Components/Pokedex/pokedex'

const CustomRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Pokedex />} />
        <Route path='/pokemon/:id' element={<PokeDetails />} />
    </Routes>
  )
}

export default CustomRoutes