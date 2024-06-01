import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import toast from 'react-hot-toast'
import { deleteUser } from '../../api/UserServices';
import ThemeContext from '../../context/ThemeContext';
import './styles.scss'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ModalDeleteUser = ({user, handleDeleteTable}) => {
    const [show, setShow] = useState(false);
    const {darkMode} = useContext(ThemeContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {logout} = useContext(UserContext)
    const navigate = useNavigate()
    const handleDeleteUser = async () => {
        let res = await deleteUser(user.id);
        if(res && +res === 401){
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
        if(res && +res === 204){
            // success
            handleClose();
            toast.success("A User is deleted succeed!", 
            {
            style: {
                borderRadius: '10px',
                background: darkMode && "#333",
                color: darkMode && '#fff',
            },
            });
            handleDeleteTable();
        }
        else{
            toast.error("A User is deleted failed!", 
            {
            style: {
                borderRadius: '10px',
                background: darkMode && "#333",
                color: darkMode && '#fff',
            },
            });
        }
    };
  return (
    <>
        <Button variant="btn btn-danger mx-3" onClick={handleShow}>
        Delete
        </Button>

        {/* <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className={`${darkMode && "my-modal"}`}> */}
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} data-bs-theme={`${darkMode && "dark"}`}>
            <Modal.Header closeButton>
                <Modal.Title><span className={`${darkMode && "text-neutral-400"}`}>Delete User</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                <span className={`${darkMode && "text-neutral-400"}`}>Are you sure to delete username: <strong>{user.userName}</strong></span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button className='!bg-indigo-600 !border-none hover:ring-2 !ring-indigo-400' onClick={handleDeleteUser}>
                Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ModalDeleteUser
