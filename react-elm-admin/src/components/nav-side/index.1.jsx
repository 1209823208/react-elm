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
			defaultOpenKeys: this.props.defaultOpenKeys !== '' ? this.props.defaultOpenKeys : '/home',
			defaultSelectedKeys: this.props.pathname !== '' ? this.props.pathname : '/home'

			// defaultOpenKeys: 'sub2',
			// defaultSelectedKeys: '/user'
		};
	}
	componentDidUpdate(prevProps) {
		if (this.props.pathname !== prevProps.pathname) {
			let defaultOpenKeys = this.props.defaultOpenKeys !== '' ? this.props.defaultOpenKeys : '/home',
				defaultSelectedKeys = this.props.pathname !== '' ? this.props.pathname : '/home';
			this.setState({
				defaultOpenKeys: defaultOpenKeys,
				defaultSelectedKeys: defaultSelectedKeys
			});
		}
	}
	onClickSub(item, key, keyPath) {
		// console.log('11', item, key, keyPath);
	}
	onOpenChange(openKeys) {
		// console.log('openKeys', openKeys);
		let defaultOpenKeys = openKeys[1],
			defaultSelectedKeys = openKeys[0];
		this.setState({
			defaultOpenKeys,
			defaultSelectedKeys
		});
	}
	render() {
		return (
			<Sider>
				<div className="logo" />
				<Menu
					theme="dark"
					defaultOpenKeys={[ this.state.defaultOpenKeys ]}
					defaultSelectedKeys={[ this.state.defaultSelectedKeys ]}
					openKeys={[ this.state.defaultOpenKeys ]}
					selectedKeys={[ this.state.defaultSelectedKeys ]}
					onClick={(item, key, keyPath) => this.onClickSub(item, key, keyPath)}
					onOpenChange={(openKeys) => this.onOpenChange(openKeys)}
					mode="inline"
				>
					<Menu.Item key="/home">
						<Icon type="appstore" />
						<span className="sideIndex">
							<Link
								to={{
									pathname: '/home',
									search: '?bread_one=首页',
									state: { defaultOpenKeys: '/home' }
								}}
							>
								首页
							</Link>
						</span>
					</Menu.Item>
					<SubMenu
						key="sub2"
						title={
							<span>
								<Icon type="file" />
								<span>数据管理</span>
							</span>
						}
					>
						<Menu.Item key="/user">
							<Link
								to={{
									pathname: '/user',
									search: '?bread_one=首页&bread_two=数据管理&bread_three=用户列表',
									state: { defaultOpenKeys: 'sub2' }
								}}
							>
								用户列表
							</Link>
						</Menu.Item>
						<Menu.Item key="/shop">
							<Link
								to={{
									pathname: '/shop',
									search: '?bread_one=首页&bread_two=数据管理&bread_three=商家列表',
									state: { defaultOpenKeys: 'sub2' }
								}}
							>
								商家列表
							</Link>
						</Menu.Item>
						<Menu.Item key="/goods">
							<Link
								to={{
									pathname: '/goods',
									search: '?bread_one=首页&bread_two=数据管理&bread_three=食品列表',
									state: { defaultOpenKeys: 'sub2' }
								}}
							>
								食品列表
							</Link>
						</Menu.Item>
						<Menu.Item key="/order">
							<Link
								to={{
									pathname: '/order',
									search: '?bread_one=首页&bread_two=数据管理&bread_three=订单列表',
									state: { defaultOpenKeys: 'sub2' }
								}}
							>
								订单列表
							</Link>
						</Menu.Item>
						<Menu.Item key="/adminList">
							<Link
								to={{
									pathname: '/adminList',
									search: '?bread_one=首页&bread_two=数据管理&bread_three=管理员列表',
									state: { defaultOpenKeys: 'sub2' }
								}}
							>
								管理员列表
							</Link>
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub3"
						title={
							<span>
								<Icon type="plus" />
								<span>添加数据</span>
							</span>
						}
					>
						<Menu.Item key="/addShop">
							<Link
								to={{
									pathname: '/addShop',
									search: '?bread_one=首页&bread_two=添加数据&bread_three=添加商铺',
									state: { defaultOpenKeys: 'sub3' }
								}}
							>
								添加商铺
							</Link>
						</Menu.Item>
						<Menu.Item key="/addGoods">
							<Link
								to={{
									pathname: '/addGoods',
									search: '?bread_one=首页&bread_two=添加数据&bread_three=添加商品',
									state: { defaultOpenKeys: 'sub3' }
								}}
							>
								添加商品
							</Link>
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub4"
						title={
							<span>
								<Icon type="star-o" />
								<span>图表</span>
							</span>
						}
					>
						<Menu.Item key="/visitor">
							<Link
								to={{
									pathname: '/visitor',
									search: '?bread_one=首页&bread_two=图表&bread_three=用户分布',
									state: { defaultOpenKeys: 'sub4' }
								}}
							>
								用户分布
							</Link>
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub5"
						title={
							<span>
								<Icon type="form" />
								<span>编辑</span>
							</span>
						}
					>
						<Menu.Item key="/p-edit">
							<Link
								to={{
									pathname: '/p-edit',
									search: '?bread_one=首页&bread_two=编辑&bread_three=文本编辑',
									state: { defaultOpenKeys: 'sub5' }
								}}
							>
								文本编辑
							</Link>
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub6"
						title={
							<span>
								<Icon type="setting" />
								<span>设置</span>
							</span>
						}
					>
						<Menu.Item key="/admin-set">
							<Link
								to={{
									pathname: '/admin-set',
									search: '?bread_one=首页&bread_two=设置&bread_three=管理员设置',
									state: { defaultOpenKeys: 'sub6' }
								}}
							>
								管理员设置
							</Link>
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub7"
						title={
							<span>
								<Icon type="exclamation-circle" />
								<span>说明</span>
							</span>
						}
					>
						<Menu.Item key="/explain">
							<Link
								to={{
									pathname: '/explain',
									search: '?bread_one=首页&bread_two=说明&bread_three=说明',
									state: { defaultOpenKeys: 'sub7' }
								}}
							>
								说明
							</Link>
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub8"
						title={
							<span>
								<Icon type="exclamation-circle" />
								<span>官网-demo</span>
							</span>
						}
					>
						<Menu.Item key="/search-product-demo">
							<Link
								to={{
									pathname: '/search-product-demo',
									search: '?bread_one=首页&bread_two=官网-React的编程思想demo&bread_three=demo',
									state: { defaultOpenKeys: 'sub8' }
								}}
							>
								React的编程思想
							</Link>
						</Menu.Item>
						<Menu.Item key="/react-context-demo">
							<Link
								to={{
									pathname: '/react-context-demo',
									search: '?bread_one=首页&bread_two=官网-Context上下文&bread_three=demo',
									state: { defaultOpenKeys: 'sub8' }
								}}
							>
								Context上下文
							</Link>
						</Menu.Item>
						<Menu.Item key="/react-refs-demo">
							<Link
								to={{
									pathname: '/react-refs-demo',
									search: '?bread_one=首页&bread_two=官网-refs&bread_three=demo',
									state: { defaultOpenKeys: 'sub8' }
								}}
							>
								refs
							</Link>
						</Menu.Item>
						<Menu.Item key="/react-fragments-demo">
							<Link
								to={{
									pathname: '/react-fragments-demo',
									search: '?bread_one=首页&bread_two=官网-fragments&bread_three=demo',
									state: { defaultOpenKeys: 'sub8' }
								}}
							>
								fragments
							</Link>
						</Menu.Item>
						<Menu.Item key="/higher-order-component">
							<Link
								to={{
									pathname: '/higher-order-component',
									search: '?bread_one=首页&bread_two=官网-higher-order-component&bread_three=demo',
									state: { defaultOpenKeys: 'sub8' }
								}}
							>
								HOC(高阶组件)
							</Link>
						</Menu.Item>
						<Menu.Item key="/portal-demo">
							<Link
								to={{
									pathname: '/portal-demo',
									search: '?bread_one=首页&bread_two=官网-portal插槽&bread_three=demo',
									state: { defaultOpenKeys: 'sub8' }
								}}
							>
								portal(插槽)
							</Link>
						</Menu.Item>
						<Menu.Item key="/render-props">
							<Link
								to={{
									pathname: '/render-props',
									search: '?bread_one=首页&bread_two=官网-render-props&bread_three=demo',
									state: { defaultOpenKeys: 'sub8' }
								}}
							>
								render-props(渲染属性)
							</Link>
						</Menu.Item>
						<Menu.Item key="/prop-types">
							<Link
								to={{
									pathname: '/prop-types',
									search: '?bread_one=首页&bread_two=官网-prop-types(类型检查)&bread_three=demo',
									state: { defaultOpenKeys: 'sub8' }
								}}
							>
								prop-types(类型检查)
							</Link>
						</Menu.Item>
						<Menu.Item key="/uncontrolled-components">
							<Link
								to={{
									pathname: '/uncontrolled-components',
									search: '?bread_one=首页&bread_two=官网-uncontrolled-components(不受控组件)&bread_three=demo',
									state: { defaultOpenKeys: 'sub8' }
								}}
							>
								uncontrolled-components(不受控组件)
							</Link>
						</Menu.Item>
					</SubMenu>
				</Menu>
			</Sider>
		);
	}
}
