import React, { useContext, useState } from 'react'
import { mockSearchResults } from '../../constants/mock';
import {XMarkIcon, MagnifyingGlassIcon} from '@heroicons/react/24/solid';
import SearchResult from '../SearchResult';
import ThemeContext from '../../context/ThemeContext';
import { searchSymbols } from '../../api/UserServices';

const Search = () => {
    const {darkMode} =  useContext(ThemeContext);
    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState([]);


    const clear = () => {
        setInput("");
        setBestMatches([]);
    }
    const updateBestMatchs = async () => {
      console.log(input);
      let res = await searchSymbols(input);
      // console.log(res);
      if(res && res.data && res.data.result)
        setBestMatches(res.data.result);
    }
  return (
    <div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96  ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}>
      <input 
        type="text" 
        value={input} 
        className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-gray-900" : null}`} 
        placeholder='Search stock...' 
        onChange={(e) => {setInput(e.target.value)}} 
        onKeyPress={(e) => {e.key === "Enter" && setInput(e.target.value)}}
      /> 
     {input && <button onClick={() => clear()} className='m-1'>
        <XMarkIcon className='h-4 w-4 fill-gray-500'/>
      </button>}
      <button onClick={() => updateBestMatchs()} className='h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 hover:ring-2 ring-indigo-400'>
        <MagnifyingGlassIcon className='h-4 w-4 fill-white'/>
      </button>
      {input && bestMatches.length > 0 && <SearchResult resutls={bestMatches} open={true} />}
    </div>
   
  )
}

export default Search
