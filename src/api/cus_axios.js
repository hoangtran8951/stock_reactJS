import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://finnhub.io/api/v1'
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    let res = {}
    if(error.response){
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
      console.log(error.response.status);
    }
    else if(error.request){
      console.log(error.request);
    }
    else
      console.log("Error", error.message);
    return res;
});
//https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&apiKey=pAWvAcb7g3bGSqeeBTDD6aTEMDj0wy_L

const instance_v2 = axios.create({
  baseURL: 'https://api.polygon.io/v2'
})

// Add a response interceptor
instance_v2.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let res = {}
  if(error.response){
    res.data = error.response.data;
    res.status = error.response.status;
    res.headers = error.response.headers;
    console.log(error.response.status);
  }
  else if(error.request){
    console.log(error.request);
  }
  else
    console.log("Error", error.message);
  return res;
});

// FMP

const instance_3 = axios.create({
  baseURL: 'https://financialmodelingprep.com/api'
})

instance_3.interceptors.response.use(function (response) {
  return response.data ? response.data : {statusCode: response.status};
}, function (error) {
  let res = {}
  if(error.response){
    res.data = error.response.data;
    res.status = error.response.status;
    res.headers = error.response.headers;
    console.log(error.response.status);
  }
  else if(error.request){
    console.log(error.request);
  }
  else
    console.log("Error", error.message);
  return res;
});

//backend server 
const instance_backend = axios.create({
  baseURL: "https://normalcoder-001-site1.etempurl.com/api"
  // baseURL: "http://localhost:5138/api"
})

instance_backend.interceptors.response.use(function (response) {
  return response.data ? response.data : response.status;
}, function (error) {
  let res = {}
  if(error.response){
    res.data = error.response.data;
    res.status = error.response.status;
    res.headers = error.response.headers;
    console.log(error.response.status);
    console.log(res.data);
  }
  else if(error.request){
    console.log(error.request);
  }
  else
    console.log("Error", error.message);
  return res;
});
export {instance, instance_v2, instance_3, instance_backend}