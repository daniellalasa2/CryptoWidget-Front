import axios from 'axios';
import {BASEURL,ROUTES} from './Urls';
const AxInstance = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
    headers: {'content-type': 'application/json'}
  });
  
let paramsFormatter = (params)=>{
    let str = "";
    if(Object.keys(params).length>0){
        for(let key in params){
            str += `${key}=${params[key]}&`
        }
    }
    if(str.length > 0){
        str = "?"+str.slice(0,str.length-1);
    }
    return str;
}
//GET
export const Get = async(routeName,params={})=>
   await AxInstance({
        url:ROUTES[routeName.toLowerCase()]["get"]+paramsFormatter(params),
        method:"GET"
    });
    
export const GetById = async(routeName,id,params={})=>
    await AxInstance({
        url:`${ROUTES[routeName.toLowerCase()]["get"]}/${id}`+paramsFormatter(params),
        method:"GET"
    });

export const Paginate = async(routeName,start,limit)=>
    await AxInstance({
        url:ROUTES[routeName.toLowerCase()]["get"],
        method:"GET",
        params:{
            _limit:limit,
            _start:start
        }
    });

export const Count = async(routeName)=>
    await AxInstance({
        url:`${ROUTES[routeName.toLowerCase()]["get"]}/count`,
        method:'GET'
    })

//POST
export const Post = async(routeName,data)=>
    await AxInstance({
        url:ROUTES[routeName.toLowerCase()]["post"],
        method:"POST",
        data:data
    });