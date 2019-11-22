import React,{Component} from 'react';
import WithCheckLogin from '../../containers/with_check_login'
@WithCheckLogin
 class NotMatch extends Component{
    render(){
        return(
            <div>404...</div>
        )
    }
}
export default NotMatch;