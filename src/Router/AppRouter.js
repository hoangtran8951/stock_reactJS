import React from 'react'
import { Routes, Route } from "react-router-dom";
import DashBoardPage from '../Pages/DashBoardPage';
import HomePage from '../Pages/HomePage';
import PortfolioPage from '../Pages/PortfolioPage';
import CompanyProfile from '../components/CompanyProfile';
import IncomeStatement from '../components/IncomeStatement';
import CashflowStatement from '../components/CashflowStatement';
import BalanceSheet from '../components/BalanceSheet';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import UserManager from '../Pages/UserManager';

const AppRouter = () => {
  return (
    <div>
      <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/dashboard" element={<DashBoardPage/>}>
              <Route path="companyprofile" element={<CompanyProfile/>}/>
              <Route path="incomestatement" element={<IncomeStatement/>}/>
              <Route path="cashflowstatement" element={<CashflowStatement/>}/>
              <Route path='balancesheet' element={<BalanceSheet/>}/>
            </Route>
            <Route path='/usermanagement' element={<UserManager/>}/>
            <Route path='/portfolio' element={<PortfolioPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            {/* <Route path="/users" 
                element={
                    <PrivateRoutes>
                        <TableUsers/>
                    </PrivateRoutes>
                }/> */}
            {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
    </div>
  )
}

export default AppRouter
