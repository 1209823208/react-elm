import React from 'react';
import './index.scss';
import { Table } from 'antd';
import { Row, Col } from 'antd';

import ShopEdit from 'containers/shopList/edit';
import ShopService from 'service/shop-service';
const _shop = new ShopService();
export default class ShopList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shopList: [],
			pagination: {
				pageSize: 20,
				current: 1,
				total: 0
			},
			latitude: '',
			longitude: '',
			loading: false,
			visible: false,
			shopDetail:{}
		};
	}
	componentDidMount() {
		//获取当前地区
		this.getCurrentCity();
		//获取店铺信息
		this.restaurantsCount();
	}
	getCurrentCity() {
		let params = {
			type: 'guess'
		};
		_shop.getCurrentCity(params).then((res) => {
			this.setState(
				{
					latitude: res.latitude,
					longitude: res.longitude
				},
				() => {
					// 获取店铺信息
					this.getShopList();
				}
			);
		});
	}
	restaurantsCount() {
		_shop.restaurantsCount().then((res) => {
			let paginationObj = { ...this.state.pagination };
			paginationObj.total = res.count;
			this.setState({
				pagination: paginationObj
			});
		});
	}
	getShopList() {
		this.setState({ loading: true });
		let params = {
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			offset: this.state.pagination.current,
			limit: this.state.pagination.pageSize
		};
		_shop.getShopList(params).then((res) => {
			this.setState({
				shopList: res,
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
				this.getShopList();
			}
		);
	};
	expandedRowRender = (res) => {
		return (
			<div className="shopList-expand">
				<Row>
					<Col span={12}>
						<span className="title">店铺名称</span>
						{res.name}
					</Col>
					<Col span={12}>
						<span className="title">店铺地址</span>
						{res.address}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<span className="title">店铺介绍</span>
						{res.description}
					</Col>
					<Col span={12}>
						<span className="title">店铺ID</span>
						{res.id}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<span className="title">联系电话</span>
						{res.phone}
					</Col>
					<Col span={12}>
						<span className="title">评分</span>
						{res.rating}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<span className="title">销售量</span>
						{res.recent_order_num}
					</Col>
					<Col span={12}>
						<span className="title">分类</span>
						{res.category}
					</Col>
				</Row>
			</div>
		);
	};
	showModal = (res) => {
		console.log('res', res);
		this.setState({
			visible: true,
			shopDetail:res
		});
	};
	
	render() {
		const columns = [
			{ title: '店铺名称', dataIndex: 'name', key: 'name', width: '20%' },
			{ title: '店铺地址', dataIndex: 'address', key: 'address', width: '25%' },
			{ title: '店铺介绍', dataIndex: 'description', key: 'description', width: '30%' },
			{
				title: '操作',
				key: 'operation',
				width: '25%',
				render: (text, record) => (
					<div>
						<a href="javascript:;">
							<button className="btns" onClick={() => this.showModal(record)}>
								编辑
							</button>
						</a>
						<a href="javascript:;">
							<button className="btns">添加食品</button>
						</a>
						<a href="javascript:;">
							<button className="btns">删除</button>
						</a>
					</div>
				)
			}
		];
		return (
			<div id="shopList">
				<Table
					className="components-table-demo-nested"
					columns={columns}
					rowKey={(record) => record.id}
					pagination={this.state.pagination}
					dataSource={this.state.shopList}
					onChange={this.handleTableChange}
					expandedRowRender={(record) => this.expandedRowRender(record)}
				/>
				<ShopEdit visible={this.state.visible} shopDetail={this.state.shopDetail}/>
			</div>
		);
	}
}
