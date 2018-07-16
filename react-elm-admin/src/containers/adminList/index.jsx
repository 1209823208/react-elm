import React from 'react';
import './index.scss';
import { Table, Icon, Divider } from 'antd';

import User from 'service/user-service';
const _user = new User();
export default class AdminList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			adminList: [],
			pagination: {
				pageSize: 20,
				current: 1,
				total: 0
			},
			loading: false
		};
	}
	componentDidMount() {
		//获取总的数量
		this.getUserCount();
	}
	getUserCount() {
		_user.adminCount().then((res) => {
			const pager = { ...this.state.pagination };
			pager.total = res.count;
			this.setState(
				{
					pagination: pager
				},
				() => {
					this.getAdminList();
				}
			);
		});
	}
	handleTableChange = (pagination) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState(
			{
				pagination: pager
			},
			() => {
				this.getAdminList();
			}
		);
	};
	getAdminList() {
		let params = this.state.pagination;
		this.setState({ loading: true });
		_user.getAdminList(params).then((res) => {
			let adminList = res.data;
			const pagination = { ...params };
			this.setState({
				adminList: adminList,
				loading: false,
				pagination
			});
		});
	}
	render() {
		const columns = [
			{
				title: '姓名',
				dataIndex: 'user_name',
				key: 'user_name'
			},
			{
				title: '注册日期',
				dataIndex: 'create_time',
				key: 'create_time'
			},
			{
				title: '地址',
				dataIndex: 'city',
				key: 'city'
			},
			{
				title: '权限',
				dataIndex: 'admin',
				key: 'admin'
			}
		];
		return (
			<div id="adminList">
				<Table
					columns={columns}
					dataSource={this.state.adminList}
					rowKey={(record,index) => index}
					onChange={this.handleTableChange}
					pagination={this.state.pagination}
				/>
			</div>
		);
	}
}
