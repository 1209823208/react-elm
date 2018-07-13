import React from 'react';
import './index.scss';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
export default class NavSide extends React.Component {
	constructor() {
		super();
		this.state = {
			name: ''
		};
	}
	render() {
		return (
			<Sider>
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline">
					<Menu.Item key="1">
						<Icon type="appstore" />
						<span>首页</span>
					</Menu.Item>
					<SubMenu
						key="2"
						title={
							<span>
								<Icon type="file" />
								<span>数据管理</span>
							</span>
						}
					>
						<Menu.Item key="3">
							<Link to={'/user'}>用户列表</Link>
						</Menu.Item>
						<Menu.Item key="4">
							<Link to={'/shop'}>商家列表</Link>
						</Menu.Item>
						<Menu.Item key="5">
							<Link to={'/goods'}>食品列表</Link>
						</Menu.Item>
						<Menu.Item key="6">订单列表</Menu.Item>
						<Menu.Item key="7">管理员列表</Menu.Item>
					</SubMenu>
					<SubMenu
						key="8"
						title={
							<span>
								<Icon type="plus" />
								<span>添加数据</span>
							</span>
						}
					>
						<Menu.Item key="9">添加商铺</Menu.Item>
						<Menu.Item key="10">添加商品</Menu.Item>
					</SubMenu>
					<SubMenu
						key="11"
						title={
							<span>
								<Icon type="star-o" />
								<span>图表</span>
							</span>
						}
					>
						<Menu.Item key="12">用户分布</Menu.Item>
					</SubMenu>
					<SubMenu
						key="13"
						title={
							<span>
								<Icon type="form" />
								<span>编辑</span>
							</span>
						}
					>
						<Menu.Item key="14">文本编辑</Menu.Item>
					</SubMenu>
					<SubMenu
						key="15"
						title={
							<span>
								<Icon type="setting" />
								<span>设置</span>
							</span>
						}
					>
						<Menu.Item key="16">管理员设置</Menu.Item>
					</SubMenu>
					<SubMenu
						key="17"
						title={
							<span>
								<Icon type="exclamation-circle" />
								<span>说明</span>
							</span>
						}
					>
						<Menu.Item key="18">说明</Menu.Item>
					</SubMenu>
				</Menu>
			</Sider>
		);
	}
}
