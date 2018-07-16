import React from 'react';
import './index.scss';
import { Table, Row, Col, message } from 'antd';

import OrderService from 'service/order-service';
const _order = new OrderService();
export default class OrderList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurant_id: this.props.restaurant_id || '',
			orderList: [],
			pagination: {
				pageSize: 20,
				current: 1,
				total: 0
			},
			loading: false,
			visible: false,
			user_name: '',
			restaurant_address: '',
			restaurant_name: '',
			shipping_address: ''
		};
	}
	componentDidMount() {
		//获取订单数量
		this.orderCount();
		//获取订单信息
		this.getOrderList();
	}
	orderCount() {
		let restaurant_id = this.state.restaurant_id;
		_order.orderCount(restaurant_id).then((res) => {
			let paginationObj = { ...this.state.pagination };
			paginationObj.total = res.count;
			this.setState({
				pagination: paginationObj
			});
		});
	}
	getOrderList() {
		this.setState({ loading: true });
		let params = {
			restaurant_id: this.state.restaurant_id,
			offset: this.state.pagination.current,
			limit: this.state.pagination.pageSize
		};
		_order.getOrderList(params).then((res) => {
			this.setState({
				orderList: res,
				loading: false
			});
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
				this.getOrderList();
			}
		);
	};
	expandedRowRender = (res) => {
		return (
			<div className="shopList-expand">
				<Row>
					<Col span={12}>
						<span className="title">用户名</span>
						{this.state.user_name}
					</Col>
					<Col span={12}>
						<span className="title">店铺名称</span>
						{res.restaurant_name}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<span className="title">收货地址</span>
						{this.state.shipping_address}
					</Col>
					<Col span={12}>
						<span className="title">店铺ID</span>
						{res.restaurant_id}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<span className="title">店铺地址</span>
						{this.state.restaurant_address}
					</Col>
					<Col span={12} />
				</Row>
			</div>
		);
	};
	showModal = (res, index) => {
		this.setState(
			{
				visible: true,
				goodsDetail: res,
				index
			},
			() => {
				console.log('this.state', this.state);
			}
		);
	};

	// 每行展示事件
	handleExpand(expanded, record) {
		if (expanded) {
			let restaurant_id = record.restaurant_id,
				user_id = record.user_id,
				address_id = record.address_id;
				_order.getRestaurantInfoAndUserIndoAndAddressInfo(restaurant_id,user_id,address_id).then((res) => {
				let user_name = res.userInfo.username,
					shipping_address = res.addressInfo.address,
					restaurant_address =
						typeof res.restaurantInfo.address === 'undefined' ? '' : res.restaurantInfo.address,
					restaurant_name = typeof res.restaurantInfo.name === 'undefined' ? '' : res.restaurantInfo.name;
				this.setState({
					user_name: user_name,
					restaurant_address: restaurant_address,
					restaurant_name: restaurant_name,
					shipping_address: shipping_address
				});
			});
		}
	}
	render() {
		const columns = [
			{ title: '订单ID', dataIndex: 'id', key: 'id', width: '20%' },
			{ title: '总价格', dataIndex: 'total_amount', key: 'total_amount', width: '25%' },
			{ title: '订单状态', dataIndex: 'status_bar.title', key: 'title', width: '30%' }
		];
		return (
			<div id="shopList">
				<Table
					className="components-table-demo-nested"
					columns={columns}
					rowKey={(record, index) => index}
					pagination={this.state.pagination}
					dataSource={this.state.orderList}
					onChange={this.handleTableChange}
					onExpand={(expanded, record) => this.handleExpand(expanded, record)}
					expandedRowRender={(record) => this.expandedRowRender(record)}
				/>
			</div>
		);
	}
}
