import React, { useState, useEffect } from 'react'
import { IncomeStatementTest } from '../../constants/mock'
import IncomeChart from '../IncomeChart'
import { useOutletContext } from 'react-router-dom';
import { getIncomeStatement } from '../../api/UserServices';

const IncomeStatement = () => {
    const [data, setData] = useState(null);
    const [active, setActive] = useState(["Reveneu"])
    const stockSymbol = useOutletContext();

    useEffect(() => {
        const getIncomeStatementData = async () => {
            let res = await getIncomeStatement(stockSymbol);
            if(res && !res.statusCode){
                setData(res);
            }
        }
        getIncomeStatementData();
        console.log(data);
    },[stockSymbol])
    const DisplayList = {
        "Reveneu": "revenue",
        "Cost Of Revenue": "costOfRevenue",
        "Depreciation": "depreciationAndAmortization",
        "Operating Income": "operatingIncome",
        "Income Before Taxes": "incomeBeforeTax",
        "Net Income": "netIncome",
        "Net Income Ratio": "netIncomeRatio",
        "Earnings Per Share": "eps",
        "Earnings Per Diluted": "epsdiluted",
        "Gross Profit Ratio": "grossProfitRatio",
        "Opearting Income Ratio": "operatingIncomeRatio",
        "Income Before Taxes Ratio": "incomeBeforeTaxRatio",
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
        <div className='md:col-span-2 row-span-4'>
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

export default IncomeStatement
