import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DashboardContext from '../../context/DashboardContext';
import "./styles.css"
import ThemeContext from '../../context/ThemeContext';
import { NavLink } from 'react-router-dom';
import {postAddPortfolio} from '../../api/UserServices'
import StockContext from '../../context/StockContext';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom';

const DashboardControl = () => {
    const {DashboardState, setDashBoardState} = useContext(DashboardContext);
    const {darkMode} = useContext(ThemeContext)
    const {stockSymbol} = useContext(StockContext);
    const navigate = useNavigate();

    const addToPofolioAPI = async (ticker) => {
        let res = await postAddPortfolio(ticker);
     
        if(res && res === 200){
          toast.success(`${ticker} added successfully`,
          {
          style: {
              borderRadius: darkMode && '10px',
              background: darkMode && '#333',
              color: darkMode && '#fff',
          },
          });
        }
        else{
          toast.error(res.data,
          {
          style: {
              borderRadius: '10px',
              background: darkMode && '#333',
              color: darkMode && '#fff',
          },
          });
        }
          
      }
    const onPortfolioCreate = () =>{
        let token = localStorage.getItem("token");
        if(token)
          addToPofolioAPI(stockSymbol);
        else {
          toast.warn("You need to log in first", 
          {
          style: {
              borderRadius: '10px',
              background: darkMode && '#333',
              color: darkMode && '#fff',
          },
          });
          navigate("/login")
        }
    }
  return (
    <>
        <button className='bg-indigo-600 p-2 rounded-md absolute right-10 xl:right-16 top-24 font-quicksand text-white hover:ring-2 ring-indigo-400' onClick={() => onPortfolioCreate()}>Add to Portfolio</button>
        <div className='absolute right-10 xl:right-16 shadow-lg'>
            <Dropdown as={ButtonGroup}>
            <Button className='custom_btn'>{DashboardState}</Button>

            <Dropdown.Toggle split className='custom_btn' id="dropdown-split-basic" />

            <Dropdown.Menu  className={`${darkMode ? "dropdownMenu-dark" : "dropdownMenu"}`}>
                <Dropdown.Item className={`${darkMode ? "dropdownItem-dark" : "dropdownItem"}`} onClick={() => setDashBoardState("Company Profile")}>
                    <NavLink to='companyprofile' className='no-underline'>
                        <span className={`${darkMode ? "text-neutral-300" : "text-gray-900"}`}>Company Profile</span>
                    </NavLink>
                </Dropdown.Item>
                <Dropdown.Item className={`${darkMode ? "dropdownItem-dark" : "dropdownItem"}`} onClick={() => setDashBoardState("Income Statement")}>
                    <NavLink to='incomestatement' className='no-underline'>
                        <span className={`${darkMode ? "text-neutral-300" : "text-gray-900"}`}>Income Statement</span>
                    </NavLink>
                </Dropdown.Item>
                <Dropdown.Item className={`${darkMode ? "dropdownItem-dark" : "dropdownItem"}`} onClick={() => setDashBoardState("Balance Sheet")}>
                    <NavLink to='balancesheet' className='no-underline'>
                        <span className={`${darkMode ? "text-neutral-300" : "text-gray-900"}`}>Balance Sheet</span>
                    </NavLink>
                </Dropdown.Item>
                <Dropdown.Item className={`${darkMode ? "dropdownItem-dark" : "dropdownItem"}`} onClick={() => setDashBoardState("Cashflow Statement")}>
                    <NavLink to='cashflowstatement' className='no-underline'>
                        <span className={`${darkMode ? "text-neutral-300" : "text-gray-900"}`}>Cashflow Statement</span>
                    </NavLink>
                </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </div>
    </>
  )
}

export default DashboardControl
