import React,{Component} from 'react';
import logo from './logo.png'
import { Form, Icon, Input,Button } from 'antd';
import "./login.less"
import {connect} from 'react-redux'
import {getUserAsync} from '../../redux/action-creators/user'
import {setItem} from '../../utils/storage'
import WithCheckLogin from '../with_check_login/index'
const {Item} = Form;
@WithCheckLogin
@Form.create()
@connect(null,{getUserAsync})

class Login extends Component{
     validator=(rule,value,callback)=>{
         const name =rule.field==="username" ?'用户名':'密码'
         if(!value){
             callback("请输入"+name);
         }else if(value.length<4){
            callback(name+"不能小于4位");
         }else if(value.length>11){
            callback(name+"不能大于11位");
         }else if(!/\w/.test(value)){
             callback("正则不通过")
         }else{
            callback();
         }
       
     };
     login = e => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFields((err, values) => {
          if (!err) {
            console.log(values);
           const {username,password} = values
           this.props.getUserAsync(username,password)
              .then(response => {
                console.log(response)
                setItem('user',response)
                  this.props.history.push("/");
             
              })
              .catch(err => {
               
            
                form.resetFields(["password"]);
              });
          }
        });
      };
    render(){
        const {getFieldDecorator}= this.props.form;
        return(
            <div className="login">
               <header className="login-header">
                   <img src={logo} alt="logo"/>
                   <h1>React后台管理系统by小金</h1>
                </header> 
                <section className="login-section">
                    <h3>用户登录</h3>
                    <Form onSubmit={this.login}>
                    <Item>
                        {
                            getFieldDecorator("username",{
                                rules:[
                            {validator:this.validator}
                        ]
                            })
                            (<Input prefix={<Icon type="user"  className="login-icon"/>}
                            placeholder="用户名"
                            ></Input>)
                        }
                        
                    </Item>
                    <Item>
                        {
                            getFieldDecorator("password",{
                                rules:[{
                                   validator:this.validator,
                                }]
                            })
                            (<Input prefix={<Icon type="lock"   className="login-icon"/>}
                            placeholder="密码"
                            type="password"
                            ></Input>)
                        }
                        
                    </Item>
                
                    <Button type="primary" className="login-btn" htmlType="submit">登录</Button>
                    </Form>
                </section>
            </div>
        )
    }
}

export default Login;