import React from 'react';
import './index.scss';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
export default class NavSide extends React.Component {
	constructor(props) {
		super(props);
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
						<span>
							<Link
								to={{
									pathname: '/home',
									search: '?project=首页'
								}}
							>
								首页
							</Link>
						</span>
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
							<Link
								to={{
									pathname: '/user',
									search: '?project=首页/数据管理/用户列表'
								}}
							>
								用户列表
							</Link>
						</Menu.Item>
						<Menu.Item key="4">
							<Link
								to={{
									pathname: '/shop',
									search: '?project=首页/数据管理/商家列表'
								}}
							>
								商家列表
							</Link>
						</Menu.Item>
						<Menu.Item key="5">
							<Link
								to={{
									pathname: '/goods',
									search: '?project=首页/数据管理/食品列表'
								}}
							>
								食品列表
							</Link>
						</Menu.Item>
						<Menu.Item key="6">
							<Link
								to={{
									pathname: '/order',
									search: '?project=首页/数据管理/订单列表'
								}}
							>
								订单列表
							</Link>
						</Menu.Item>
						<Menu.Item key="7">
							<Link
								to={{
									pathname: '/adminList',
									search: '?project=首页/数据管理/管理员列表'
								}}
							>
								管理员列表
							</Link>
						</Menu.Item>
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
						<Menu.Item key="9">
							<Link
								to={{
									pathname: '/addShop',
									search: '?project=首页/添加数据/添加商铺'
								}}
							>
								添加商铺
							</Link>
						</Menu.Item>
						<Menu.Item key="10">
							<Link
								to={{
									pathname: '/addGoods',
									search: '?project=首页/添加数据/添加商品'
								}}
							>
								添加商品
							</Link>
						</Menu.Item>
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
						<Menu.Item key="12">
							<Link
								to={{
									pathname: '/visitor',
									search: '?project=首页/图表/用户分布'
								}}
							>
								用户分布
							</Link>
						</Menu.Item>
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
						<Menu.Item key="14">
							<Link
								to={{
									pathname: '/p-edit',
									search: '?project=首页/编辑/文本编辑'
								}}
							>
								文本编辑
							</Link>
						</Menu.Item>
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
						<Menu.Item key="16">
							<Link
								to={{
									pathname: '/admin-set',
									search: '?project=首页/设置/管理员设置'
								}}
							>
								管理员设置
							</Link>
						</Menu.Item>
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
						<Menu.Item key="18">
							<Link
								to={{
									pathname: '/explain',
									search: '?project=首页/说明/说明'
								}}
							>
								说明
							</Link>
						</Menu.Item>
					</SubMenu>
				</Menu>
			</Sider>
		);
	}
}
