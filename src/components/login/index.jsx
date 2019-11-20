import React,{Component} from 'react';
import logo from './logo.png'
import { Form, Icon, Input,Button,message } from 'antd';
import "./login.less"
import axios from 'axios';
const {Item} = Form;
@Form.create()
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
            axios
              .post("http://localhost:5000/api/login", values)
              .then(response => {
                if (response.data.status === 0) {
                  this.props.history.push("/");
                } else {
                  message.error(response.data.msg);
                  form.resetFields(["password"]);
                }
              })
              .catch(err => {
                console.log(err);     
                message.error("网络出现故障，请刷新试试~");
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
                            //         {
                            //        required:true,
                            //        message:"请输入用户名"
                            //     },{
                            //         min:4,
                            //         message:"最小长度为4"
                            //     },
                            // {
                            //     max:11,
                            //     message:"最大长度为11"
                            // },{
                            //     pattern:/\w/,
                            //     message:"只能输入字母数字下划线"
                            // }
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