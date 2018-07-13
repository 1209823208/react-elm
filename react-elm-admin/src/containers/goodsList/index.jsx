import React from 'react';
import './index.scss';
import { Table, Row, Col, message } from 'antd';

import GoodsService from 'service/goods-service';
import GoodsEdit from 'containers/goodsList/edit';
const _goods = new GoodsService();
export default class GoodsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			goodsList: [],
			pagination: {
				pageSize: 20,
				current: 1,
				total: 0
			},
			restaurant_id: this.props.restaurant_id || '',
			loading: false,
			visible: false,
			goodsDetail: {},
			category_name: '',
			restaurant_address: '',
			restaurant_name: '',
			index:0,//当前食品index
		};
	}
	componentDidMount() {
		//获取食品数量
		this.goodsCount();
		//获取食品信息
		this.getGoodsList();
	}
	goodsCount() {
		_goods.goodsCount().then((res) => {
			let paginationObj = { ...this.state.pagination };
			paginationObj.total = res.count;
			this.setState({
				pagination: paginationObj
			});
		});
	}
	getGoodsList() {
		this.setState({ loading: true });
		let params = {
			restaurant_id: this.restaurant_id,
			offset: this.state.pagination.current,
			limit: this.state.pagination.pageSize
		};
		_goods.getGoodsList(params).then((res) => {
			this.setState({
				goodsList: res,
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
				this.getGoodsList();
			}
		);
	};
	expandedRowRender = (res) => {
		return (
			<div className="shopList-expand">
				<Row>
					<Col span={12}>
						<span className="title">食品名称</span>
						{res.name}
					</Col>
					<Col span={12}>
						<span className="title">餐馆名称</span>
						{this.state.restaurant_name}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<span className="title">食品ID</span>
						{res.item_id}
					</Col>
					<Col span={12}>
						<span className="title">餐馆ID</span>
						{res.restaurant_id}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<span className="title">食品介绍</span>
						{res.description}
					</Col>
					<Col span={12}>
						<span className="title">餐馆地址</span>
						{this.state.restaurant_address}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<span className="title">食品评分</span>
						{res.rating}
					</Col>
					<Col span={12}>
						<span className="title">食品分类</span>
						{this.state.category_name}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<span className="title">月销量</span>
						{res.month_sales}
					</Col>
				</Row>
			</div>
		);
	};
	showModal = (res,index) => {
		this.setState({
			visible: true,
			goodsDetail: res,
			index
		},()=>{
			console.log('this.state',this.state);
		});
	};
	changeVisible(isUpdate = 0) {
		this.setState({
			visible: false
		});
		if (isUpdate === 1) {
			this.getGoodsList();
		}
	}
	delShop = (res) => {
		_goods.delGoods(res.item_id).then((res) => {
			if (res.status === 0) {
				message.error(res.message);
				return '';
			}
		});
	};
	// 每行展示事件
	handleExpand(expanded, record) {
		if (expanded) {
			let restaurant_id = record.restaurant_id,
				category_id = record.category_id;
			_goods.getCategoryAndRestaurantInfo(restaurant_id, category_id).then((res) => {
				let category_name = res.categoryInfo.name,
					restaurant_address =
						typeof res.restaurantInfo.address === 'undefined' ? '' : res.restaurantInfo.address,
					restaurant_name = typeof res.restaurantInfo.name === 'undefined' ? '' : res.restaurantInfo.name;
				this.setState({
					category_name: category_name,
					restaurant_address: restaurant_address,
					restaurant_name: restaurant_name
				});
			});
		}
	}
	render() {
		const columns = [
			{ title: '食品名称', dataIndex: 'name', key: 'name', width: '20%' },
			{ title: '食品介绍', dataIndex: 'description', key: 'description', width: '25%' },
			{ title: '评分', dataIndex: 'rating', key: 'rating', width: '30%' },
			{
				title: '操作',
				key: 'operation',
				width: '25%',
				render: (text, record,index) => (
					<div>
						<a href="javascript:;">
							<button className="btns" onClick={() => this.showModal(record,index)}>
								编辑
							</button>
						</a>
						<a href="javascript:;">
							<button className="btns" onClick={() => this.delShop(record)}>
								删除
							</button>
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
					rowKey={(record, index) => index}
					pagination={this.state.pagination}
					dataSource={this.state.goodsList}
					onChange={this.handleTableChange}
					onExpand={(expanded, record) => this.handleExpand(expanded, record)}
					expandedRowRender={(record) => this.expandedRowRender(record)}
				/>
				{this.state.visible ? (
					<GoodsEdit
						visible={this.state.visible}
						goodsDetail={this.state.goodsDetail}
						currentIndex = {this.state.index}
						changeVisible={(isUpdate) => this.changeVisible(isUpdate)}
					/>
				) : (
					''
				)}

			</div>
		);
	}
}
