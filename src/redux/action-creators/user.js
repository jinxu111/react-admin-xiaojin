import {reqLogin} from '../../api'
import {GET_USER_SUCCESS} from '../action-types/user'
const getUserSuccess=(user)=>{
    return {
        type:GET_USER_SUCCESS,
        data:user
    }
}

export const getUserAsync=(username,password)=>{
   return (dispatch)=>{
       return reqLogin(username,password)
        .then((response)=>{
            const action=getUserSuccess(response);
            dispatch(action)
            return response;
        })
        
    }
}