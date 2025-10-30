import React from 'react'
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({query}:{query?:string}) => {
    
  return (
    <div>
      <form action="/" className='search-form' autoComplete='off'>
            <input 
                name='query'
                defaultValue={query}
                className='search-input'
                placeholder='Search Startups'
            />
            <div className='flex gap-2'>
                {query && <SearchFormReset/>}
                <button type='submit' className='search-btn'>
                    <Search className='size-5' />
                </button>
                
            </div>
      </form>
    </div>
  )
}

export default SearchForm

