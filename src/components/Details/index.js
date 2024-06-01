import React, { useContext } from 'react'
import Card from '../Card'
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormetting';
import ThemeContext from '../../context/ThemeContext';

const Details = ({details}) => {
    const {darkMode} = useContext(ThemeContext);
    const detailsList = {
        name: "Name",
        country: "Country",
        currency: "Currency",
        exchange: "Exchange",
        ipo: "IPO Date",
        marketCapitalization: "MarketCap",
        finnhubIndustry: "Industry", 
    };
  return (
    <Card>
      <ul className={`w-full h-full flex flex-col justify-between divide-y-1 ${darkMode ? "divide-gray-800" : null}`}>
        {Object.keys(detailsList).map((item) => {
            return <li key={item} className='flex-1 flex justify-between items-center'>
                <span>{detailsList[item]}</span>
                <span>{item === "marketCapitalization" ? `${formatLargeMonetaryNumber(details[item])}` : details[item]}</span>
            </li>
        }) }
      </ul>
      
    </Card>
  )
}

export default Details
