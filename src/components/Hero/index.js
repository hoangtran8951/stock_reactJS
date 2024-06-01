import React, { useContext } from 'react'
import hero from './hero.png'
import ThemeContext from '../../context/ThemeContext'
import { NavLink } from 'react-router-dom'
const Hero = () => {
    const {darkMode} = useContext(ThemeContext);
  return (
    <>
        <div className={`h-screen flex flex-row md:flex-col-reverse mx-auto p-8 ${darkMode ? "bg-gray-800" : ""}`}>
            <div className="flex flex-col space-y-10 mb-44 m-10 md:m-0 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52">
                <h1 className={`text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left ${darkMode && "text-gray-300"}`}>
                    Financial data with no news.
                </h1>
                <p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
                    Search relevant financial documents without fear mongering and fake
                    news.
                </p>
                <div className="mx-auto lg:mx-0 my-5">
                    <NavLink
                        to='/login'
                    >
                        <button className="py-5 px-10 sm:py-3 sm:px-8 text-2xl md:text-xl font-bold text-white bg-indigo-600 rounded lg:py-4 hover:opacity-70 no-underline">
                            Get Started
                        </button>
                    </NavLink>
                </div>
            </div>
            <div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
                <img src={hero} alt="" />
            </div>
        </div>  
    </>
  )
}

export default Hero
