import React from 'react';
import './index.scss';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { sidebarData, groupKey } from 'components/nav-side/side-bar-date';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
export default class NavSide extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultOpenKeys: this.props.defaultOpenKeys !== '' ? this.props.defaultOpenKeys : '/sub1',
			defaultSelectedKeys: this.props.pathname !== '' ? this.props.pathname : '/home'

			// defaultOpenKeys: 'sub2',
			// defaultSelectedKeys: '/user'
		};
	}
	componentDidUpdate(prevProps) {
		if (this.props.pathname !== prevProps.pathname) {
			let defaultOpenKeys = this.props.defaultOpenKeys !== '' ? this.props.defaultOpenKeys : '/sub1',
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
		let SideTree = sidebarData.map(item => {
			return (<SubMenu key={item.key} 
				title={
						<span>
							<Icon type={item.title.icon} />
							<span>{item.title.text}</span>
						</span>
					}>
						{
						item.children && item.children.map((menuItem)=>{
							return(<Menu.Item key={menuItem.key}>
								<Link to={menuItem.to}>
									{menuItem.text}
								</Link>
							</Menu.Item>)
						})
					}
			</SubMenu>)
		});
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
					mode="inline">
				{SideTree}
				</Menu>
			</Sider>
		);
	}
}
