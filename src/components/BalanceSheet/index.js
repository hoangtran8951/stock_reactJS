import React, { useEffect, useState } from 'react'
import { BalanceStatementText } from '../../constants/mock'
import IncomeChart from '../IncomeChart'
import { useOutletContext } from 'react-router-dom'
import { getBalanceSheet } from '../../api/UserServices'

const BalanceSheet = () => {
    const stockSymbol = useOutletContext();
    const [active, setActive] = useState(["Total Assets"])
    const [data, setData] = useState(null);
    useEffect(() => {
        const getBalanceSheetData = async () => {
            let res = await getBalanceSheet(stockSymbol);
            if(res && !res.statusCode){
                setData(res);
            }
        }
        getBalanceSheetData();
    },[stockSymbol])
    const DisplayList = {
        "Total Assets": "totalAssets",
        "Current Assets": "totalCurrentAssets",
        "Total Cash": "cashAndCashEquivalents",
        "Property & equipment": "propertyPlantEquipmentNet",
        "Intangible Assets": "intangibleAssets",
        "Long Term Debt": "longTermDebt",
        "Total Debt": "otherCurrentLiabilities",
        "Total Liabilites": "totalLiabilities",
        "Current Liabilities": "totalCurrentLiabilities",
        "Long-Term Debt": "longTermDebt",
        "Long-Term Income Taxes": "otherLiabilities",
        "Stakeholder's Equity": "totalStockholdersEquity",
        "Retained Earnings": "retainedEarnings"

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
        <div className='md:col-span-2 row-span-4 md:row-span-2'>
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

export default BalanceSheet
