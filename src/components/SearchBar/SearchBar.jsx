import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import './SearchBar.css';
import { useGlobalContext } from '../Context';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const { updateSearch } = useGlobalContext();
    useEffect(() => {
        updateSearch(searchValue);
        return () => { };
    }, [searchValue]);
    return (
        <>
            <div className="search-wrapper">
                <FaSearch id="search-icon" />
                <input className="search-input" placeholder="Search User" value={searchValue} onChange={(e) => {
                    setSearchValue(e.target.value)
                }} />
            </div>
        </>
    );
}
export default SearchBar;
