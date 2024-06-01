import {instance, instance_3, instance_v2, instance_backend} from './cus_axios'

const searchSymbols = (query) => {
    return instance.get(`/search?q=${query}&token=${process.env.REACT_APP_FINHUB_API_KEY}`);
}
const getCompanyProfile = (symbol) => {
    return instance.get(`/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_FINHUB_API_KEY}`);
}
const getCompanyQuote = (symbol) => {
    return instance.get(`/quote?symbol=${symbol}&token=${process.env.REACT_APP_FINHUB_API_KEY}`);
}
//
const getCompanyCandles_v2 = (symbol, num, dateUnit, from, to) => {
    return instance_v2.get(`/aggs/ticker/${symbol}/range/${num}/${dateUnit}/${from}/${to}?adjusted=false&limit=4000&apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`)
}
//
// const getCompanyProfile = (symbol) => {
//     return instance.get(`/v3/profile/${symbol}?apikey=${apiKey}`)
// }

const getSearchByTicker = (ticker) => {
    return instance_3.get(`/v3/search-ticker?query=${ticker}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_FMP_KEY_1}`)
}

const getKeyMetricsTTM = (symbol) => {
    return instance_3.get(`/v3/key-metrics-ttm/${symbol}?apikey=${process.env.REACT_APP_FMP_KEY_1}`)
}

const getIncomeStatement = (symbol) => {
    return instance_3.get(`/v3/income-statement/${symbol}?period=annual&apikey=${process.env.REACT_APP_FMP_KEY_1}`)
}

const getBalanceSheet = (symbol) => {
    return instance_3.get(`/v3/balance-sheet-statement/${symbol}?period=annual&apikey=${process.env.REACT_APP_FMP_KEY_1}`)
}

const getCashflow = (symbol) => {
    return instance_3.get(`/v3/cash-flow-statement/${symbol}?limit=100&apikey=${process.env.REACT_APP_FMP_KEY_1}`)
}
//______________________________________________________________backend api______________________________________________________________________
//Account
const postRegisterAccount = (userName, email, password) => {
    return instance_backend.post(`/account/register`, {userName: userName, email: email, password: password});
}
const postLoginAccount = (email, password) => {
    return instance_backend.post('/account/login', {email: email, password: password})
}
//Comment
const postComment = (symbol, title, content) => { 
    instance_backend.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    return instance_backend.post(`/comment/${symbol}`,{title, content} );
}
const getCommentBySymbol = (symbol) => {
    instance_backend.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    return instance_backend.get(`/comment?Symbol=${symbol}`);
}
//Portfolio
const postAddPortfolio = (symbol) => {
    instance_backend.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    return instance_backend.post(`/portfolio?symbol=${symbol}`);
}

const getUserPortfolio = () => {
    instance_backend.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    return instance_backend.get(`/portfolio`);
}
const deleteUserPortfolio = (symbol) => {
    instance_backend.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    return instance_backend.delete(`/portfolio?symbol=${symbol}`); 
}
//manager account
const getUserList = (page, page_size) => {
    instance_backend.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    return instance_backend.get(`/manager?PageNumber=${page}&PageSize=${page_size}`)
}
const deleteUser = (id) => {
    console.log(">>>>>>>");
    instance_backend.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    // return instance_backend.delete(`/manager`, {userName, email});
    return instance_backend.delete(`/manager/${id}`);
}

export {searchSymbols, getCompanyProfile, getCompanyQuote, getCompanyCandles_v2,
        getSearchByTicker, getKeyMetricsTTM, getIncomeStatement,getBalanceSheet, getCashflow,
        postLoginAccount, postRegisterAccount, // account
        postComment, getCommentBySymbol, // stock comment
        postAddPortfolio, getUserPortfolio, deleteUserPortfolio, // portfolio
        getUserList, deleteUser}; 