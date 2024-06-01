import React, { useContext, useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import ThemeContext from '../../context/ThemeContext';
import { getUserList } from '../../api/UserServices';
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ModalDeleteUser from '../../components/ModalDeleteUser';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import {XMarkIcon, MagnifyingGlassIcon} from '@heroicons/react/24/solid';
import "./styles.scss"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/UserContext';

const theme = createTheme({
    palette: {
        primary: {
            main: "#4F46E5",
            contrastText: '#FFFFFF',
        },
    },
});

const UserManager = () => {
    const {darkMode} = useContext(ThemeContext);
    const [listUser, setListUser] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [input, setInput] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const {logout} = useContext(UserContext)
    useEffect(() => {
        getUser(1);
    },[])
    const getUser = async (page) => {
        let res = await getUserList(page, 5);
        console.log(res);
        if(res && +res.status == 401){
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
        if(res && res.data){
          setTotalPages(res.total_pages);
          setListUser(res.data);
        }
    }
    const handlePageChange = (event, value) => {
        setPage(value);
        getUser(+value);
    }
    const handleDeleteTable = () => {
        getUser(page);
    }
    const clear = () => {
        setInput("");
    }
    const updateSortBy = async () => {
      console.log(input);
    //   let res = await searchSymbols(input);
    //   // console.log(res);
    //   if(res && res.data && res.data.result)
    //     setBestMatches(res.data.result);
    }

  return (
    <>
        <div className={`w-screen h-screen ${darkMode ? "bg-gray-800 text-gray-300" : "bg-neutral-100"}`}>
            <div className='py-4 ml-20'>
                <div className={`flex items-center border-2 rounded-md relative z-50 w-96  ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}>
                    <input 
                        type="text" 
                        value={input} 
                        className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-gray-900" : null}`} 
                        placeholder='Search by email...' 
                        onChange={(e) => {setInput(e.target.value)}} 
                        onKeyPress={(e) => {e.key === "Enter" && setInput(e.target.value)}}
                    /> 
                    {input && <button onClick={() => clear()} className='m-1'>
                        <XMarkIcon className='h-4 w-4 fill-gray-500'/>
                    </button>}
                    <button onClick={() => updateSortBy()} className='h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 hover:ring-2 ring-indigo-400'>
                        <MagnifyingGlassIcon className='h-4 w-4 fill-white'/>
                    </button>
                </div>
            </div>
            <div className='flex flex-row-reverse mr-20 py-10'>
                <Dropdown as={ButtonGroup}>
                <Button className='custom_btn'>Sort by</Button>

                <Dropdown.Toggle split className='custom_btn' id="dropdown-split-basic" />

                <Dropdown.Menu  className={`${darkMode ? "dropdownMenu-dark" : "dropdownMenu"}`}>
                    <Dropdown.Item className={`${darkMode ? "dropdownItem-dark" : "dropdownItem"}`} >
                            <span className={`${darkMode ? "text-neutral-300" : "text-gray-900"}`}>None</span>
                    </Dropdown.Item>
                    <Dropdown.Item className={`${darkMode ? "dropdownItem-dark" : "dropdownItem"}`} >
                            <span className={`${darkMode ? "text-neutral-300" : "text-gray-900"}`}>Income Statement</span>
                    </Dropdown.Item>
                    <Dropdown.Item className={`${darkMode ? "dropdownItem-dark" : "dropdownItem"}`} >
                            <span className={`${darkMode ? "text-neutral-300" : "text-gray-900"}`}>Balance Sheet</span>
                    </Dropdown.Item>
                    <Dropdown.Item className={`${darkMode ? "dropdownItem-dark" : "dropdownItem"}`} >
                            <span className={`${darkMode ? "text-neutral-300" : "text-gray-900"}`}>Cashflow Statement</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='cus-table'>
                <Table striped bordered hover variant={`${darkMode && "dark"}`}>
                    <thead>
                    <tr>
                        <th>
                        <div className='sort-header'>
                            <span>
                            ID
                            </span>
                        </div>
                        </th>
                        <th>
                        <div className='normal-header'>
                            Email
                        </div>
                        </th>
                        <th>
                        <div className='sort-header'>
                            <span>
                            Username
                            </span>
                        </div>
                        </th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listUser && listUser.length > 0 &&
                    listUser.map((item, index) => {
                        return (
                            <tr key={`users-${index}`}>
                                <td>{(page-1)*5+index+1}</td>
                                <td>{item.email}</td>
                                <td>{item.userName}</td>
                                <td>
                                    <ModalDeleteUser
                                    user={item}
                                    handleDeleteTable={handleDeleteTable}
                                    />
                                </td>
                            </tr>
                        )
                    })
                    }
                    
                    </tbody>
                </Table>
            </div>
            <ThemeProvider theme={theme}>
                <div className='flex flex-row items-center justify-center'>
                    <Pagination 
                        count={totalPages}
                        color='primary'
                        page={page}
                        siblingCount={0}
                        onChange={handlePageChange}
                    />
                </div>
            </ThemeProvider>
        </div>
    </>
  )
}

export default UserManager
