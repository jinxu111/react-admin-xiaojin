import axiosInstance from './request';
export const reqLogin =(username,password)=>{
    return axiosInstance({
        method:'POST',
        url:'/login',
        data:{
            username,
            password
        }

    })
}