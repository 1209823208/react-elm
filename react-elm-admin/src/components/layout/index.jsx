import React from 'react';
import { withRouter } from 'react-router-dom';

import './index.scss';
import NavSide from 'components/nav-side/index';
import NavFooter from 'components/nav-footer/index';
import { Layout, Breadcrumb, Menu, Dropdown, message, Row, Col } from 'antd';
import User from 'service/user-service';
const _user = new User();
const { Content } = Layout;
class LayoutIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bread_crumbs_arr: []
		};
	}
	componentDidMount() {
		this.getParams();
	}
	// componentDidUpdate(){
	// 	console.log('componentDidUpdate',this.props)
	// }
	// componentWillMount(){
	// 	console.log('componentWillMount',this.props)
	// }
	componentWillUpdate() {
		this.getParams();
	}
	getParams() {
		if (this.props) {
			let search_arr = this.props.location.search ? this.props.location.search.split('?')[1] : '';
			if (search_arr) {
				let params = search_arr.split('&');
				if (params) {
					for (let i in params) {
						let m_key = params[i].split('=')[0],
							m_value = params[i].split('=')[1];
						if (m_key === 'project') {
							let bc = m_value.split('/');
							console.log('bc',bc);
							
							return;
						}
					}
				}
			}
		}
	}
	// componentWillReceiveProps(){
	// 	console.log('componentWillReceiveProps',this.props)
	// }
	handleMenuClick = (e) => {
		if (e.key === '2') {
			_user.logout().then((res) => {
				message.info(`${res.success}`);
				this.props.history.push('/login'); // 路由跳转
			});
		} else {
			this.props.history.push('/home'); // 路由跳转
		}
	};
	render() {
		const bread_crumbs_list = this.state.bread_crumbs_arr.map((item,index)=>{
			return(
				<Menu.Item key={{index}}>{{item}}</Menu.Item>
			)
		})
		const menu = (
			<Menu onClick={this.handleMenuClick}>
				{{bread_crumbs_list}}
			</Menu>
		);
		return (
			<div id="wrapper">
				<Layout style={{ minHeight: '100vh' }}>
					<NavSide />
					<Layout>
						<Content style={{ margin: '0 16px' }}>
							<Layout>
								<Row>
									<Col span={22}>
										<Content>
											<Breadcrumb style={{ margin: '16px 0' }}>
												<Breadcrumb.Item>首页</Breadcrumb.Item>
												<Breadcrumb.Item>11</Breadcrumb.Item>
											</Breadcrumb>
										</Content>
									</Col>
									<Col span={2} style={{ lineHeight: 1.8 }}>
										<Content>
											<Dropdown overlay={menu}>
												<a
													className="ant-dropdown-link"
													href="javascript:void(0)"
													style={{ fontSize: 30 }}
												>
													<i className="fa fa-user-circle" aria-hidden="true" />
												</a>
											</Dropdown>
										</Content>
									</Col>
								</Row>
							</Layout>
							<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{this.props.children}</div>
						</Content>
						<NavFooter />
					</Layout>
				</Layout>
			</div>
		);
	}
}
export default withRouter(LayoutIndex);
