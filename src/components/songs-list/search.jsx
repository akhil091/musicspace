import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Search = ({ searchInput, onSearchInputChange }) => {
    return (
        <div className='flex justify-between items-center bg-[#ffffff15] rounded-lg py-[8px] px-[16px] mt-3 md:mt-6 w-full'>
            <input 
                type='search' 
                placeholder='Search Song, Artist' 
                className='w-full bg-transparent border-none outline-none font-[inter] text-white text-[16px]' 
                value={searchInput} 
                onChange={onSearchInputChange} 
            />
            <FiSearch className='text-[#ffffff60] text-xl' />{/* Search icon */}
        </div>
    );
};

export default Search;
