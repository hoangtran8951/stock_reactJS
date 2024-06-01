import { useState } from 'react';
import './App.css';
import ThemeContext from './context/ThemeContext';
import StockContext from './context/StockContext';
import DashboardContext from './context/DashboardContext';
import DashBoardPage from './Pages/DashBoardPage';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import AppRouter from './Router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import CompanyContext from './context/CompanyContext';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [DashboardState, setDashBoardState] = useState("Company Profile") // Income Statement, Balance Sheet, Cashflow Statement
  const [CompanyName, setCompanyName] = useState("Apple Inc")
  return (
    <> 
      <UserProvider>
      <ThemeContext.Provider value={{darkMode, setDarkMode}}>
      <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
      <DashboardContext.Provider value={{DashboardState, setDashBoardState}}>
      <CompanyContext.Provider value={{CompanyName, setCompanyName}}>
            <BrowserRouter>
              <NavBar/>
              {/* <DashBoardPage/> */}
              {/* <Hero/> */}
              <AppRouter/>
            </BrowserRouter>
      </CompanyContext.Provider>
      </DashboardContext.Provider>
      </StockContext.Provider>
      </ThemeContext.Provider>
      </UserProvider>

      <Toaster/>
    </>
  );
}

export default App;
