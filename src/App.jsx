import React,{Component} from 'react';
import routes from './config/routes'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import "./index.less"
export default class App extends Component{
    render(){
        return(
            <Router>
                <Switch>
                {
                    routes.map((route,index)=>{
                        return <Route {...route} key={index}/>

                    })
                }
                </Switch>

            </Router>  
        )
        
    }
}