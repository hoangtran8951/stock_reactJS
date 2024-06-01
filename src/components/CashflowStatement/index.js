import React, { useState, useEffect } from 'react'
import { CashflowStatementTest } from '../../constants/mock'
import IncomeChart from '../IncomeChart'
import { useOutletContext } from 'react-router-dom'
import { getCashflow } from '../../api/UserServices'

const CashflowStatement = () => {
    const [active, setActive] = useState(["Operating Cashflow"])
    const [data, setData] = useState(null);
    const stockSymbol = useOutletContext();
    useEffect(() => {
        const getCashflowData = async () => {
            let res = await getCashflow(stockSymbol);
            if(res && !res.statusCode){
                setData(res);
            }
        }
        getCashflowData();
    },[stockSymbol])
    const DisplayList = {
        "Operating Cashflow": "operatingCashFlow",
        "Investing Cashflow": "netCashUsedForInvestingActivites",
        "Financing Cashflow": "netCashUsedProvidedByFinancingActivities",
        "Cash At End of Period": "cashAtEndOfPeriod",
        "CapEX": "capitalExpenditure",
        "Issuance Of Stock": "commonStockIssued",
        "Free Cash Flow": "freeCashFlow",
        
    }
    const setDisplayValue = (e) => {
        if(active.length > 0){
            console.log(e);
            if(active.findIndex(item => {return item === e}) === -1){
                if(active.length < 3)
                 setActive([...active, e])
            }
            else {
                if(active.length > 1)
                    setActive(active.filter(item =>  item !== e))
            }
                    
        }
    }
  return (
    <>
        <div className='md:col-span-2 row-span-2'>
            {data && <IncomeChart data={data} display={active} DisplayList={DisplayList}/>}
        </div>
        <div className='md:col-span-2 row-span-1'>
            <ul className='grid items-center justify-items-center gap-2 grid-cols-8 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2'>
                {Object.keys(DisplayList).map((item) => {
                    return (
                        <li key={item}>
                            {/* <ChartFilter text={item} active={filter === item} onClick={() => setFilter(item)}/> */}
                            <button 
                                onClick={() => setDisplayValue(item)} 
                                className={`w-32 m-2 h-20 px-3 border-1 rounded-md flex items-center justify-center cursor-pointer ${active.findIndex(i => {return i === item}) !== -1 ? "bg-indigo-600 border-indigo-700 text-gray-100" : "border-indigo-300 text-indigo-300"} transition duration-300 hover:scale-125 hover:bg-indigo-600 hover:text-gray-100`}
                                >
                                {item}
                            </button>
                        </li>
                    )
                })}
            </ul>
        
        </div>
    </>
  )
}

export default CashflowStatement
