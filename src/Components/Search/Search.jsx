import React from 'react'
import './search.css'
import useDebounce from '../../Hooks/useDebounce'

const Search = ({updateSearchTerm}) => {

  // use Debounce hook -> jab hm pura type karle uske bad netword request jaye (2sec baad)
 const debouncedCallback = useDebounce((e)=> updateSearchTerm(e.target.value))

  return (
    <div className='search-wrapper'>
        
        <input id='search-input'
            type='text'
            placeholder='Pokemon name....'
            onChange={debouncedCallback}
        />

    </div>
  )
}

export default Search