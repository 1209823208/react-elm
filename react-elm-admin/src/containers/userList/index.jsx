import React from 'react';
import './index.scss';
import { Table, Icon, Divider } from 'antd';

import User from 'service/user-service';
const _user = new User();
export default class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userList: [],
			pagination: {
				pageSize:20,
				current:1,
				total:0,
			},
			loading: false
		};
	}
	componentDidMount() {
		//获取总的数量
		this.getUserCount();
	}
	getUserCount(){
		_user.getUserCount().then((res)=>{
			const pager = { ...this.state.pagination };
			pager.total = res.count;
			this.setState({
				pagination:pager
			},()=>{
				this.getUserList()
			});
		})
	}
	handleTableChange = (pagination) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		console.log('pager2',pager)
    this.setState({
      pagination: pager,
    },()=>{
			this.getUserList()
		});
	}
	getUserList() {
		let params = this.state.pagination;
		this.setState({ loading: true });
		_user.getUserList(params).then((res) => {
			let userList = [];
			res.forEach((item) => {
				userList.push({
					id: item.id,
					registe_time: item.registe_time,
					username: item.username,
					city: item.city
				});
			});
			const pagination = { ...params };
			this.setState({
				userList: userList,
				loading: false,
				pagination,
			});
		});
	}
	render() {
		const columns = [
			{
				title: '#',
				dataIndex: 'id',
				key: 'id'
			},
			{
				title: '注册日期',
				dataIndex: 'registe_time',
				key: 'registe_time'
			},
			{
				title: '用户姓名',
				dataIndex: 'username',
				key: 'username'
			},
			{
				title: '注册地址',
				dataIndex: 'city',
				key: 'city'
			}
		];
		return (
			<div id="userList">
				<Table
					columns={columns}
					dataSource={this.state.userList}
					rowKey={(record) => record.id}
					onChange={this.handleTableChange}
					pagination={this.state.pagination}
				/>
			</div>
		);
	}
}
