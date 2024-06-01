import React , {useState, useEffect, useContext} from 'react'
import PortfolioCard from './PorfolioCard'
import { getUserPortfolio } from '../../api/UserServices'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import ThemeContext from '../../context/ThemeContext';
import toast from 'react-hot-toast';

const Portfolio = () => {
    const [stockList, setStockList] = useState([]);
    const navigate = useNavigate();
    const {logout} = useContext(UserContext);
    const {darkMode} = useContext(ThemeContext)
    useEffect(() => {
        (async function() {
            try {
                const res = await getUserPortfolio();
                if(res && +res.status === 401){
                  logout();
                  navigate("/login");
                  toast.success("Your session has expired, please login", 
                  {
                  style: {
                      borderRadius: '10px',
                      background: darkMode && "#333",
                      color: darkMode && '#fff',
                  },
                  });
                }
                if(res && res[0]){
                    setStockList(res);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    },[])
    function setReload(){
      (async function() {
          try {
              const res = await getUserPortfolio();
              if(res && +res.status === 401){
                logout();
                navigate("/login");
                toast.success("Your session has expired, please login", 
                {
                style: {
                    borderRadius: '10px',
                    background: darkMode && "#333",
                    color: darkMode && '#fff',
                },
                });
              }
              if(res && res[0]){
                  setStockList(res);
              }
          } catch (e) {
              console.error(e);
          }
      })();
  }
  return (
    <>
      { stockList && stockList.length > 0 
        ? (
          <div className={`grid mx-4 items-center justify-items-center gap-2 grid-cols-8 lg:grid-cols-6 md:grid-cols-2`}>
            {stockList.map((item, index) => {
              return (
                  <PortfolioCard key={index} stockName={item.symbol} setReload={setReload}/>
              )})
            }
          </div>
          )
        : <p className="py-3 text-xl font-semibold text-center justify-items-center relative ">Your portfolio is empty</p> 
      }
    </>
  )
}

export default Portfolio
