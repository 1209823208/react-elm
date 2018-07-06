import React from 'react';
import './index.scss';
import NavSide from 'components/nav-side/index';
import NavFooter from 'components/nav-footer/index';
import { Layout, Breadcrumb, Menu, Dropdown, Icon, message, Row, Col } from 'antd';

const { Content } = Layout;
export default class LayoutIndex extends React.Component {
	constructor() {
		super();
		this.state = {
			name: ''
		};
	}
	onClick = function({ key }) {
		message.info(`Click on item ${key}`);
	};
	render() {
		const menu = (
			<Menu onClick="()=>this.onClick()">
				<Menu.Item key="1">首页</Menu.Item>
				<Menu.Item key="2">退出</Menu.Item>
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
									<Col span={2} style={{lineHeight:1.8}}>
										<Content>
											<Dropdown overlay={menu}>
												<a className="ant-dropdown-link" href="javascript:void(0)" style={{ fontSize:30}} >
												    <i className="fa fa-user-circle" aria-hidden="true"></i>
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
