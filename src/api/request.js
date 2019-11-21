import axios from 'axios';
import {message} from 'antd'
let token='';
const axiosInstance=axios.create({
    baseURL:'http://localhost:5000/api',
    timeout:10000,
    headers:{

    }
})
axiosInstance.interceptors.request.use(
    (config)=>{
        if(config.method==='post'){
            config.headers['content-type']='application/x-www-form-urlencoded'
            config.data = Object.keys(config.data).reduce((prev, key) => {
    const value = config.data[key];
    return prev + `&${key}=${value}`;
  }, '').substring(1);
}
if(token){
    config.headers.authorization = 'Bearer ' + token;
}
return config;
        }
    
)

axiosInstance.interceptors.response.use(
    ({data})=>{

        if(data.status===0){
            return data.data
        }else{
           message.error(data.msg)
            return Promise.reject(data.msg)
        }
    },
    (error)=>{

    const messageCode ={
       407:'token问题,没有权限',
       404:'资源找不到',
       403:'禁止访问',
       500:'服务器内部错误'
    }
    let errorMsg='';
if(error.response){
    errorMsg=(messageCode[error.response.status])||'未知错误'
}else{
    if(error.message.indexOf('Network Error')!==-1){
        errorMsg='你没网了'
    }else if(error.message.indexOf('timeout')!==-1){
        errorMsg='请求超时'
    }else{
        errorMsg='未知错误'
    }
}
        
        message.error(errorMsg);
        return Promise.reject(errorMsg);
    }
)
export default axiosInstance;