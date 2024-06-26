import React, { useContext, useState, useEffect } from 'react'
import Card from '../Card'
import { mockCompanyDetails } from '../../constants/mock'
import Header from '../Header'
import Details from '../Details'
import Overview from '../Overview'
import Chart from '../Chart'
import ThemeContext from '../../context/ThemeContext'
import StockContext from '../../context/StockContext'
import { getCompanyProfile, getCompanyQuote } from '../../api/UserServices'
import {Outlet} from "react-router-dom"
import CompanyContext from '../../context/CompanyContext'
import StockComment from '../StockComment'

const Dashboard = () => {
    const {darkMode} = useContext(ThemeContext)
    const {stockSymbol} = useContext(StockContext);
    const {CompanyName} = useContext(CompanyContext);

  return (
    <div className={`h-full grid grid-cols-1 md:grid-cols-2 xl:grid_cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${darkMode ? "bg-gray-800 text-gray-300" : "bg-neutral-100"}`}>
      <div className='col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center'>
        <Header name={CompanyName}/>
      </div>
      <Outlet context={`${stockSymbol}`}/>
      <div className='md:col-span-2 row-span-4'>
        <StockComment symbol={stockSymbol}/>
      </div>
      
    </div>
  )
}

export default Dashboard
