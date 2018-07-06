import React from 'react';
import './index.scss';
import { Form, Icon, Input, Button } from 'antd';
import User from 'service/user-service';
const _user = new User();
const FormItem = Form.Item;
class Login extends React.Component {
	constructor(props) {
		super(props);
  }
	handleSubmit = (e) => {
		e.preventDefault();
    var formData= this.props.form.getFieldsValue();
    console.log(formData);
    _user.login(formData).then((res)=>{
      this.props.history.push('/home'); // 路由跳转
    })
	};

	render() {
    let {getFieldProps} = this.props.form;
		return (
			<div id="login">
        <p className="login-title">elm后台管理系统</p>
         <div className="login-content">
            <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem>
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username" {...getFieldProps('user_name')} 
                />
              </FormItem>
              <FormItem>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password" {...getFieldProps('password')}
                />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit"  className="login-form-button">
                  Log in
                </Button>
              </FormItem>
            </Form>
            <div className="tip">
              <p>温馨提示：</p>
              <p>未登录过的新用户，自动注册</p>
              <p>注册过的用户可凭账号密码登录</p>
            </div>
          </div>
			</div>
		);
	}
}
export default Login = Form.create({})(Login);
