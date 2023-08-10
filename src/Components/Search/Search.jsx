import React from 'react'
import './search.css'

const Search = () => {
  return (
    <div className='search-wrapper'>
        
        <input id='search-input'
            type='text'
            placeholder='Pokemon name....'
        />
    </div>
  )
}

export default Search