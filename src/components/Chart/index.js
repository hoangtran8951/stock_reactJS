import React, { useContext, useState, useEffect } from 'react'
import Card from '../Card'
import { HistoricalData, mockHistoricalData } from '../../constants/mock'
import { AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area } from 'recharts';
import ChartFilter from '../ChartFilter';
import {chartConfig} from '../../constants/config'
import ThemeContext from '../../context/ThemeContext';
import { convertDateToUnixTimestamp, convertUnixMSTimestampToDate, convertUnixTimestampToDate, createDate } from '../../Helpers/date-helper';
import { getCompanyCandles, getCompanyCandles_v2 } from '../../api/UserServices';
import StockContext from '../../context/StockContext';


const Chart = () => {
   
    const [filter,setFilter] = useState('1W');
    const {darkMode} = useContext(ThemeContext);
    const {stockSymbol} = useContext(StockContext);
    const [testData, setTestData] = useState(HistoricalData.results)
    const formatData = (data) => {
        return data.map((item, index) => {
            return {
                value: item.c.toFixed(2),
                date: convertUnixMSTimestampToDate(item.t)
            }
        })
    }
    const [data, setData] =  useState(formatData(HistoricalData.results));

    useEffect(() => {
        const formatDate = (date) => {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('-');
        }
        const getDateRange = () => {
            const {days, weeks, months, years, resolution} = chartConfig[filter]
            const endDate = new Date();
            const startDate = createDate(endDate, -days, -weeks, -months, -years);

            return {resolution, startDate, endDate}
        }
        const updateChart = async () => {
            const {resolution, startDate, endDate} = getDateRange();
            let timespan = resolution === "D" ? "day" : "minute";

            console.log(stockSymbol, resolution === "D" ? "1" : resolution, timespan, formatDate(startDate), formatDate(endDate));
            let res = await getCompanyCandles_v2(stockSymbol, resolution === "D" ? "1" : resolution, timespan, formatDate(startDate), formatDate(endDate));
            if(res && res.data && res.data.results)
                setData(formatData(res.data.results))
        }
        updateChart();
    },[stockSymbol,filter])
  return (
    <Card>
        <ul className='flex absolute top-2 right-2 z-40'>
            {Object.keys(chartConfig).map((item) => {
                return (
                    <li key={item}>
                        <ChartFilter text={item} active={filter === item} onClick={() => setFilter(item)}/>
                    </li>
                )
            })}
        </ul>
      <ResponsiveContainer>
        <AreaChart data = {data}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={ darkMode ? "#312e81" : "#8884d8"} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={ darkMode ? "#312e81" : "#8884d8"} stopOpacity={0}/>
                </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="#312e81" fillOpacity={1} stockeWidth={0.5} fill="url(#colorUv)"/>
            <Tooltip contentStyle={darkMode ? {backgroundColor: "#111827"} : null} itemStyle={darkMode ? {color: "#818cf8"} : null}/>
            <XAxis dataKey={"date"}/>
            <YAxis domain={["dataMin", "dataMax"]}/>
            
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default Chart
