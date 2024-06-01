import React, { useContext, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'
import StockContext from '../../context/StockContext'
import { useNavigate } from 'react-router-dom'

const SearchResult = ({resutls}) => {
  const {darkMode} = useContext(ThemeContext);
  const {setStockSymbol} = useContext(StockContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  return (
    <ul className={`${!open && "hidden"} absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll ${darkMode ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark" : "bg-white border-neutral-200 custom-scrollbar"}`}>
        {resutls.map((item) => {
          return( 
            <li key={item.symbol} 
              className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"} transition duration-300`} 
              onClick={() => {setStockSymbol(item.symbol); navigate("/dashboard/companyprofile"); setOpen(false);}}>
                <span>{item.symbol}</span>
                <span>{item.description}</span>
            </li>)
            
        })}
    </ul>
  )
}

export default SearchResult

