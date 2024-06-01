import React, {useContext} from 'react'
import ThemeContext from '../context/ThemeContext'
import Portfolio from '../components/Portfolio';

const PortfolioPage = () => {
    const {darkMode} = useContext(ThemeContext);
  return (
    <div className={`h-screen w-screen ${darkMode ? "bg-gray-800 text-gray-300" : "bg-neutral-100"}`}>
      <Portfolio/>
    </div>
  )
}

export default PortfolioPage
