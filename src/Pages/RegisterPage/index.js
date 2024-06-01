import React, {useEffect, useState} from 'react'
import '../LoginPage/styles.scss'
import toast from 'react-hot-toast'
import { postLoginAccount } from '../../api/UserServices'
import {NavLink, Navigate, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import ThemeContext from '../../context/ThemeContext'
import { postRegisterAccount } from '../../api/UserServices'

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setRes] = useState(null);
    const navigate = useNavigate();
    const {login} = useContext(UserContext);
    const {darkMode} = useContext(ThemeContext)

    useEffect(() => {
        if(username !== "" && password !== "" && email !== "")
            setIsActive(true);
        else 
            setIsActive(false);
        if(password === "")
            setIsShowPassword(false);
    },[username, password, email, isActive])

    const RegisterReq = async () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let trimEmail = email.trim();
        if ( re.test(trimEmail) ) {
            setIsLoading(true);
            let res = await postRegisterAccount(username, trimEmail, password);
            
            setRes(res);
            setIsLoading(false);
            if(res && res.token){
                login(trimEmail, username, res.token);
                toast.success("you logged in succeed",
                {
                  style: {
                    borderRadius: '10px',
                    background: darkMode && "#333",
                    color: darkMode && "#fff",
                  },
                });
                navigate( "/" );
            }
            else{
                if(res && res.data)
                    res.data.forEach(item => toast.error(item.description))
                else 
                    toast.error("Something wrong",
                    {
                      style: {
                        borderRadius: '10px',
                        background: darkMode && "#333",
                        color: darkMode && "#fff",
                      },
                    });
            }
        }
        else {
            toast.error(`Your Email is invalid`,
            {
              style: {
                borderRadius: '10px',
                background: darkMode && "#333",
                color: darkMode && "#fff",
              },
            });
        }
    }
    const handlePressEnter = (event) => {
        if(event && event.key === "Enter"){
            if(username !== "" && password !== ""  && email !== ""){
                RegisterReq();
            }
        }
    }
  return (
    <div className={`w-screen h-screen ${darkMode ? "bg-gray-800 text-gray-300" : "bg-neutral-100"}`}>
        <div className={`${darkMode ? "login-container-dark bg-gray-900" : "login-container"} col-12 col-sm-8 p-10 rounded shadow`}>
            <div className="title">Register</div>
            <div className="text">UserName</div>
            <input type='text' placeholder='UserName...' value={username} 
                onChange={(event) => setUsername(event.target.value)} 
                onKeyDown={(event) => handlePressEnter(event)}
                onClick={(event) => setUsername(event.target.value)}
            />
            <div className="text">Email</div>
            <input type='text' placeholder='Email...' value={email} 
                onChange={(event) => setEmail(event.target.value)} 
                onKeyDown={(event) => handlePressEnter(event)}
                onClick={(event) => setEmail(event.target.value)}
            />
            <div className="text">Password</div>
            <div className='password-input'>
                <input type={((isShowPassword && password !== "")? 'text' : 'password')} placeholder='••••••••' value={password} 
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                    />
                {/* <i className={((isShowPassword && password !== "")? "fa-solid fa-eye" : "fa-solid fa-eye-slash")}  onClick={() => setIsShowPassword(!isShowPassword)}></i> */}
            </div>
            <button disabled={!isActive} onClick={() => {!isLoading && RegisterReq()}}>
                {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : <span>Register</span>} 
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <NavLink
                to={'/login'}
                className={`font-medium ${darkMode ? "text-gray-300" : "text-black"} no-underline hover:underline`}
            >
            Login
            </NavLink>
        </p>
            <div className='back' onClick={()=>navigate("/")}><i className="fa-solid fa-chevron-left"></i> <span className='text-back'>Go back</span></div>
        </div>
    </div>
  )
}

export default RegisterPage
