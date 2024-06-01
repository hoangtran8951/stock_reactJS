import React, {useState, useEffect, useContext} from 'react'
import { Card } from 'react-bootstrap'
import { getCompanyProfile, getCompanyQuote } from '../../../api/UserServices';
import ThemeContext from '../../../context/ThemeContext';
import './styles.css'
import { useNavigate } from 'react-router-dom';
import StockContext from '../../../context/StockContext';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { deleteUserPortfolio } from '../../../api/UserServices';
import toast from 'react-hot-toast';

const PortfolioCard = ({stockName, setReload}) => {
    const [stockDetails, setStockDetails] = useState({});
    const [quote, setQuote] = useState({})
    const {darkMode} = useContext(ThemeContext)
    const navigate = useNavigate()
    const {setStockSymbol} = useContext(StockContext)

    useEffect(() => {
      const updateStockDetails = async () => {
        let res = await getCompanyProfile(stockName);
        console.log(res);
        if(res && res.data)
          setStockDetails(res.data);
      }
      const updateQuote = async () => {
        let res = await getCompanyQuote(stockName);
        if(res && res.data)
          setQuote(res.data);
      }

      updateQuote();
      updateStockDetails();
    },[])
    const handleProfolioCardClick = () => {
      setStockSymbol(stockName);
      navigate("/dashboard/companyprofile");
    }
    const handleDeletePortfolioAPI = async (symbol) => {
      let res = await deleteUserPortfolio(symbol)
      if(res && res === 204){
        toast.success(`${symbol} removed successfully`, 
        {
        style: {
            borderRadius: '10px',
            background: darkMode && "#333",
            color: darkMode && '#fff',
        },
        });
        setReload();
      }
      else toast.error(res.data, 
        {
        style: {
            borderRadius: '10px',
            background: darkMode && "#333",
            color: darkMode && '#fff',
        },
        });
    }
  return (
    <div className={`mt-5 hover:scale-125 transition duration-300`}>
        <Card className={`${darkMode ? "customCard-dark" : "customCard" }`}>
            <span className='absolute left-2 top-2 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl cursor-pointer' onClick={() => handleProfolioCardClick()}>
                {stockName}
            </span>
            <button onClick={() => handleDeletePortfolioAPI(stockName)} className='m-1'>
              <XMarkIcon className='h-6 w-6 fill-gray-500 absolute right-2 top-2 hover:scale-90'/>
            </button>
            <div className='w-full h-full items-center justify-around p-6 inline-block'>
                <span className='text-2xl xl:text-4xl 2xl:text-5xl flex items-center text-neutral-400'>
                    ${quote.pc}
                    <span className='text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2'>{stockDetails.currency}</span>
                </span>
                <span className={`text-lg xl:text-xl 2xl:text-2xl ${quote.dp > 0 ? "text-lime-500" : 'text-red-500'} m-2`}>
                    {quote.d} <span>({quote.dp?.toFixed(2)}%)</span>
                </span>
            </div>
        </Card>
    </div>
  )
}

export default PortfolioCard
