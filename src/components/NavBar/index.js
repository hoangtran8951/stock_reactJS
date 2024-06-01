import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './logo.png'
import ThemeContext from '../../context/ThemeContext';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ThemeIcon from '../ThemeIcon';
import { UserContext } from '../../context/UserContext';
import {toast} from 'react-hot-toast'

const NavBar = () => {
    const {darkMode} = useContext(ThemeContext);
    let location = useLocation();
    const {user, logout} = useContext(UserContext);
    const [loggin, setLoggin] = useState(false);
    useEffect(() => {
      let token = localStorage.getItem("item");
      if(token) {
        setLoggin(true);
      }
      // console.log(user.name);
    },[])
    const Logout = () => {
      let token = localStorage.getItem("token");
      if(token){
        logout();
        toast.success("You have Logged out succeed",
        {
          style: {
            borderRadius: '10px',
            background: darkMode && "#333",
            color: darkMode && "#fff",
          },
        });
      }
    }
  return (
    <Navbar collapseOnSelect expand="xl" className={`${darkMode ? "bg-gray-800" :"bg-body-tertiary"}`}>
      <Container>
        {/* <Navbar.Brand href="#home">
            <img src={logo} alt='logo'/>
        </Navbar.Brand> */}
        <NavLink to='/'><img src={logo} alt='logo'/></NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            {user && user.auth && <>
            <NavLink 
                to="/dashboard/companyprofile" 
                className={ `no-underline block py-2 px-1 font-quicksand ${darkMode ? "text-gray-300" : "text-gray-900"}  ${location.pathname.startsWith("/dashboard") ? "font-bold" : "font-quicksand"}`}
            >
                Dashboard
            </NavLink>
            <NavLink 
                to="/portfolio" 
                className={ `no-underline block py-2 px-1 font-quicksand ${darkMode ? "text-gray-300" : "text-gray-900"}  ${location.pathname === "/portfolio" ? "font-bold" : "font-quicksand"}`}
            >
                Portfolio
            </NavLink>
            <NavLink 
                to="/usermanagement" 
                className={ `no-underline block py-2 px-1 font-quicksand ${darkMode ? "text-gray-300" : "text-gray-900"}  ${location.pathname === "/usermanagement" ? "font-bold" : "font-quicksand"}`}
            >
                User Management
            </NavLink>
            
            </>}

          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            <NavDropdown 
              title={<span className={`py-2 font-bold ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                      Setting
                    </span>} 
              id="collapsible-nav-dropdown" menuVariant={`${darkMode ? "dark" : ""}`} 
              className='mr-5'
            >
              {user && user.auth ? (
                <NavLink 
                  to="/" 
                  onClick={() => Logout()}
                  className={ `no-underline block py-2 px-3 font-quicksand font-bold ${darkMode ? "text-gray-300 hover:bg-indigo-600" : "text-gray-900 hover:bg-indigo-300"} `}
                >
                    Logout
                </NavLink>
              ): (
                <>
                  <NavLink 
                      to="/login" 
                      className={ `no-underline block py-2 px-3 font-quicksand ${darkMode ? "text-gray-300 hover:bg-indigo-600" : "text-gray-900 hover:bg-indigo-300"}  ${location.pathname === "/login" ? "font-bold" : "font-quicksand"}`}
                  >
                      Login
                  </NavLink>
                  <NavLink 
                      to="/register" 
                      className={ `no-underline block py-2 px-3 font-quicksand ${darkMode ? "text-gray-300 hover:bg-indigo-600" : "text-gray-900 hover:bg-indigo-300"}  ${location.pathname === "/resgiter" ? "font-bold" : "font-quicksand"}`}
                  >
                      Register
                  </NavLink>
                </>
              )}
             
             
             
            </NavDropdown>
            <ThemeIcon/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
