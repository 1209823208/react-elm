import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
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
			bread_crumbs_arr: [],
			pathname:'',
			defaultOpenKeys:''
		};
	}
	componentWillMount(){
		// console.log('componentWillMount');
	}
	componentDidMount() {
		// console.log('componentDidMount');
		this.getParams();
	}
	componentWillReceiveProps(prevProps){
		// console.log('componentWillReceiveProps');
	}
	componentWillUpdate(){
		// console.log('componentWillUpdate');
	}
	componentDidUpdate(prevProps,prevState) {
		// console.log('componentDidUpdate');
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.getParams();
		}
	}
	componentWillUnmount(){
		// console.log('componentWillUnmount');
	}
	getParams() {
		if (this.props) {
			let pathname = this.props.location.pathname,
			 defaultOpenKeys = typeof this.props.location.state!=='undefined' && typeof this.props.location.state.defaultOpenKeys!=='undefined'?this.props.location.state.defaultOpenKeys:'';
			if (this.props.location.search) {
				var parsed = queryString.parse(this.props.location.search);
				let new_bread_crumbs_arr = [];
				if (typeof parsed.bread_one !== 'undefined') {
					new_bread_crumbs_arr.push(parsed.bread_one);
				}
				if (typeof parsed.bread_two !== 'undefined') {
					new_bread_crumbs_arr.push(parsed.bread_two);
				}
				if (typeof parsed.bread_three !== 'undefined') {
					new_bread_crumbs_arr.push(parsed.bread_three);
				}
				this.setState({
					bread_crumbs_arr: new_bread_crumbs_arr,
					pathname,
					defaultOpenKeys
				});
			}
		}
	}

	handleMenuClick = (e) => {
		if (e.key === '2') {
			_user.logout().then((res) => {
				message.info(`${res.success}`);
				this.props.history.push('/login'); // 路由跳转
			});
		} else {
			this.props.history.push({
				pathname: '/home',
				search: '?bread_one=首页'
			}); // 路由跳转
		}
	};
	render() {
		const menu = (
			<Menu onClick={this.handleMenuClick}>
				<Menu.Item key="1">首页</Menu.Item>
				<Menu.Item key="2">退出</Menu.Item>
			</Menu>
		);
		const BreadcrumbList = this.state.bread_crumbs_arr.map((item, index) => {
			return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
		});
		return (
			<div id="wrapper">
				<Layout style={{ minHeight: '100vh' }}>
					<NavSide pathname ={this.state.pathname} defaultOpenKeys={this.state.defaultOpenKeys} />
					<Layout>
						<Content style={{ margin: '0 16px' }}>
							<Layout>
								<Row>
									<Col span={22}>
										<Content>
											<Breadcrumb style={{ margin: '16px 0' }}>{BreadcrumbList}</Breadcrumb>
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
