import React, { useContext, useEffect, useState } from 'react'
import { getCommentBySymbol, postComment} from '../../api/UserServices';
import toast from "react-hot-toast"
import StockCommentListItem from './StockCommentListItem';
import Spinner from '../Spinner'
import ThemeContext from '../../context/ThemeContext';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const StockComment = ({symbol}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [active, setActive] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [renderKey, setRenderKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const {darkMode} = useContext(ThemeContext)
    const {logout} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        (async function() {
            setLoading(true);
            try {
                const res = await getCommentBySymbol(symbol);
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
                    setCommentList(res);
                }
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        })();
    },[])
    const reloadCommentList = async () => {
        setLoading(true);
        try {
            const res = await getCommentBySymbol(symbol);
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
                setCommentList(res);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }
    useEffect(() => {
        if(title !== "" && content !== "" )
            setActive(true);
        else setActive(false);
    },[title, content])
    const submitComment = async () => {
        if(title !== "" || content !== ""){
            // console.log(symbol);
            let res = await postComment(symbol, title, content);
            // console.log(res);
            if(res && res.id){
                toast.success("Your comment has been submitted!", 
                {
                style: {
                    borderRadius: '10px',
                    background: darkMode && "#333",
                    color: darkMode && '#fff',
                },
                });
                reloadCommentList();
                setTitle("");
                setContent("");
            }
            else {
                toast.error("Something wrong!", 
                {
                style: {
                    borderRadius: '10px',
                    background: darkMode && "#333",
                    color: darkMode && '#fff',
                },
                });
            }
        } 
    }
  return (
    <>
        <div key={renderKey} className='w-full mr-8'>
            {commentList && commentList.length > 0
            &&( loading ? <Spinner/> : commentList.map((item, index) =>  {
                return <StockCommentListItem key={index} comment={item}/>
            }))}
        </div>
        
        <div className='w-full'>
            <input
                type="text"
                id="title"
                className={`mb-3 sm:text-sm rounded-lg block w-full p-2.5 ${darkMode ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 dark:focus:border-blue-500" : "bg-white border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600"} `}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className={`py-2 px-4 mb-4 rounded-lg rounded-t-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                <label htmlFor="comment" className="sr-only">
                Your comment
                </label>
                <textarea
                id="comment"
                rows={6}
                className={`px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none ${darkMode ? "text-white placeholder-gray-400 bg-gray-800" : ""} `}
                placeholder="Write a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <button
                onClick={() => submitComment()}
                disabled={!active}
                className={`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center rounded-lg text-white ${active ? " bg-indigo-600 hover:ring-2 ring-indigo-400" : "bg-indigo-400"}`}
            >
                Post comment
            </button>

        </div>
    </>
  )
}

export default StockComment;
