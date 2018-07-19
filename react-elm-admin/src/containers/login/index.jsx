import React from 'react';
import './index.scss';
import { Form, Icon, Input, Button, message } from 'antd';
import User from 'service/user-service';
const _user = new User();
const FormItem = Form.Item;
class Login extends React.Component {
	constructor(props) {
		super(props);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		var formData = this.props.form.getFieldsValue();
		_user.login(formData).then((res) => {
			if (res.status === 1) {
				console.log('props', this.props);
				const { from } = this.props.location.state || { from: { pathname: '/home', search: '?bread_one=首页' } };
				this.props.history.push({
					from
				}); // 路由跳转
			} else {
				message.info(res.message);
			}
		});
	};

	render() {
		let { getFieldProps } = this.props.form;
		return (
			<div id="login">
				<p className="login-title">elm后台管理系统</p>
				<div className="login-content">
					<Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
						<FormItem>
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Username"
								{...getFieldProps('user_name')}
							/>
						</FormItem>
						<FormItem>
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Password"
								{...getFieldProps('password')}
							/>
						</FormItem>
						<FormItem>
							<Button type="primary" htmlType="submit" className="login-form-button">
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
export default (Login = Form.create({})(Login));
