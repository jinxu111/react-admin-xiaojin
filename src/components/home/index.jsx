import React,{Component} from 'react';
import BasicLayout from '../basic-layout/index'
import WithCheckLogin from '../../containers/with_check_login/index'
@WithCheckLogin
 class Home extends Component{
    render(){
        return(
            <div>
                <BasicLayout></BasicLayout>
            </div>
        )
    }
}
export default Home;