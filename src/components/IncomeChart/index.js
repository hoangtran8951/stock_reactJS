import React, {useContext, useEffect, useState} from 'react'
import Card from '../Card';
import { AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area } from 'recharts';
import ThemeContext from '../../context/ThemeContext';

const IncomeChart = ({data, display, DisplayList}) => {
    const {darkMode} = useContext(ThemeContext)
    const formatData = (Indata) => {
        return Indata.map((item => {
            let formattedItem = {
                date: item["date"]
            };
            for (let i = 0; i < display.length; i++) {
                const displayKey = display[i];
                formattedItem[displayKey] = item[DisplayList[displayKey]];
            }
            return formattedItem;
        }))
    }
    const [drawData, setDrawData] = useState(formatData(data)) ;
    useEffect(() => {
        setDrawData(formatData(data));
    },[display])
    
  return (
    <>
        <Card>
            <ResponsiveContainer>
                <AreaChart data = {drawData}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={ darkMode ? "#312e81" : "#8884d8"} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={ darkMode ? "#312e81" : "#8884d8"} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorbl" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8dd1e1" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8dd1e1" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    {display.map((item, index) => {
                        // console.log()
                        return <Area type="monotone" dataKey={item} stroke={`${index === 0 ? "#8884d8" : index === 1 ? "#82ca9d" : "#8dd1e1"})`} fillOpacity={1} stockeWidth={0.5} fill={`url(${index === 0 ? "#colorUv" : index === 1 ? "#colorPv" : "#colorbl"})`}/>
                    })}
                    <Tooltip contentStyle={darkMode ? {backgroundColor: "#111827"} : null} itemStyle={darkMode ? {color: "#818cf8"} : null}/>
                    <XAxis dataKey={"date"}/>
                    {/* <YAxis domain={["dataMin", "dataMax"]}/> */}
                    <YAxis />
                    
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    </>
  )
}

export default IncomeChart
