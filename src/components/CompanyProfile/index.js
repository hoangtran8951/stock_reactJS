import React, { useContext, useEffect, useState } from 'react'
import Chart from '../Chart'
import Overview from '../Overview'
import Details from '../Details'
import { useOutletContext } from 'react-router-dom'
import CompanyContext from '../../context/CompanyContext'
import { getCompanyProfile, getCompanyQuote } from '../../api/UserServices'

const CompanyProfile = () => {
    const stockSymbol = useOutletContext();
    const {setCompanyName} = useContext(CompanyContext)

    const [stockDetails, setStockDetails] = useState({});
    const [quote, setQuote] = useState({})

    useEffect(() => {
      const updateStockDetails = async () => {
        let res = await getCompanyProfile(stockSymbol);
        console.log(res);
        if(res && res.data)
          setStockDetails(res.data);
      }
      const updateQuote = async () => {
        let res = await getCompanyQuote(stockSymbol);
        if(res && res.data)
          setQuote(res.data);
      }

      updateQuote();
      updateStockDetails();
    },[stockSymbol])
    useEffect(() => {
        setCompanyName(stockDetails.name);
    },[stockDetails])

  return (
    <>
       <div className='md:col-span-2 row-span-4'>
            <Chart/>
        </div>
        <div>
            <Overview symbol={stockDetails.ticker} price={quote.pc} change={quote.d} changePercent={quote.dp} currency={stockDetails.currency}/>
        </div>
        <div className='row-span-2 xl:row-span-3 text-wrap'>
            <Details details={stockDetails}/>
      </div>
    </>
  )
}

export default CompanyProfile
