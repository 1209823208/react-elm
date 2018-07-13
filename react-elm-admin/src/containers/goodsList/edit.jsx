import React from 'react';
import './index.scss';
import { Modal } from 'antd';
import { Input, Button, Table, Row, Col, InputNumber, message } from 'antd';
import GoodsService from 'service/goods-service';
import _URL from 'service/axios-service';
const _goods = new GoodsService();
export default class GoodsEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: this.props.visible || false,
			options: [],
			goodsDetail: {},
			loading: false,
			categoryList: [],
			specsVisible: false,
			specs_name: '', //多规格名称-临时
			specs_free: 1, //多规格包装费-临时
			specs_price: 20, //多规格价格-临时,
			specs:[],
			currentIndex:this.props.currentIndex||0
		};
	}
	componentWillMount() {
		console.log('componentWillMount');
	}
	componentDidMount() {
		console.log('componentDidMount', this.props.goodsDetail);
		const goodsDetail = { ...this.props.goodsDetail };
		goodsDetail.imageUrl = goodsDetail.img ? _URL('img/' + goodsDetail.img) : '';
		goodsDetail.new_category_id = goodsDetail.category_id ? goodsDetail.category_id : '';
		let newSpecs = goodsDetail.specfoods.slice(0);
		this.setState(
			{
				goodsDetail,
				specs:newSpecs
			},
			() => {
				this.getCategory();
				this.getCategoryAndRestaurantInfo()
			}
		);
	}
	getCategoryAndRestaurantInfo() {
		const goodsDetail = { ...this.state.goodsDetail };
		let restaurant_id = goodsDetail.restaurant_id,
				category_id = goodsDetail.category_id;
			_goods.getCategoryAndRestaurantInfo(restaurant_id, category_id).then((res) => {
				let category_name = res.categoryInfo.name,
					restaurant_address =
						typeof res.restaurantInfo.address === 'undefined' ? '' : res.restaurantInfo.address,
					restaurant_name = typeof res.restaurantInfo.name === 'undefined' ? '' : res.restaurantInfo.name;
					goodsDetail.category_name = category_name;
					goodsDetail.restaurant_address = restaurant_address;
					goodsDetail.restaurant_name = restaurant_name;
				this.setState({
					goodsDetail
				});
			});
	}
	componentWillReceiveProps() {
		console.log('componentWillReceiveProps');
	}
	getCategory() {
		let params = {
			restaurant_id: this.state.goodsDetail.restaurant_id,
			allMenu: true
		};
		_goods.getCategory(params).then((res) => {
			this.setState({
				categoryList: res
			});
		});
	}
	handleGoodsChange(e, flag = '') {
		if (flag === 'specs') {
			this.setState({
				specs_name: e.target.value
			});
		} else {
			let s = { ...this.state.goodsDetail };
			s[e.target.name] = e.target.value;
			this.setState({
				goodsDetail: s
			});
		}
	}
	onChangeFree(value) {
		this.setState({
			specs_free: value
		});
	}
	onChangePrice(value) {
		this.setState({
			specs_price: value
		});
	}
	handleOk = () => {
		let oldData = this.state.goodsDetail;
		let params = {
			category_id: oldData.category_id,
			category_name: oldData.category_name,
			description: oldData.description,
			image_path: '164877dc91e16833.jpg',
			index: this.state.currentIndex,
			item_id: oldData.item_id,
			month_sales: oldData.month_sales,
			name: oldData.name,
			new_category_id: oldData.new_category_id,
			rating: oldData.rating,
			restaurant_address: oldData.restaurant_address,
			restaurant_id: oldData.restaurant_id,
			restaurant_name: oldData.restaurant_name,
			specfoods:oldData.specfoods,
			specs:this.state.specs
		};
		_goods.updatefood(params).then((res)=>{
			if(res.status === 1){
				this.props.changeVisible(1);
			}
		})
	};
	handleCancel = () => {
		this.props.changeVisible();
	};
	handleVisibleOk() {
		if (this.state.specs_name === '') {
			message.info('规格不能为空');
			return '';
		}
		let newSpecsArr = this.state.specs;
		for (let val of newSpecsArr) {
			if (val.specs_name === this.state.specs_name) {
				message.info('规格重复');
				return '';
			}
		}
		let newObj = {
			specs_name: this.state.specs_name,
			packing_fee: this.state.specs_free,
			price: this.state.specs_price
		};
		newSpecsArr.push(newObj);
		this.setState(
			{
				specs: newSpecsArr,
				specsVisible: false
			}
		);
	}
	handleVisibleCancel() {
		this.setState({
			specsVisible: false
		});
	}
	//移除规格
	removeSpecs(id) {
		let m = this.state.specs;
		if (m.length > 0) {
			m.splice(id, 1);
			this.setState({
				specs: m
			});
		}
	}
	// 添加规格
	addSpecs() {
		this.setState({
			specsVisible: true
		});
	}
	render() {
		const categoryArr = this.state.categoryList.map((res, index) => {
			return (
				<option key={index} value={res.id}>
					{res.name}
				</option>
			);
		});
		// 多规格
		const columns = [
			{
				title: '规格',
				dataIndex: 'specs_name',
				key: 'specs_name'
			},
			{
				title: '包装费',
				dataIndex: 'packing_fee',
				key: 'packing_fee'
			},
			{
				title: '价格',
				dataIndex: 'price',
				key: 'price'
			},
			{
				title: 'Action',
				key: 'action',
				render: (text, record, index) => (
					<span>
						<a
							href="javascript:;"
							onClick={() => {
								this.removeSpecs(index);
							}}
						>
							删除
						</a>
					</span>
				)
			}
		];
		return (
			<Modal title="修改食品信息" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
				<Row gutter={16}>
					<Col className="gutter-row" span={4}>
						<div className="gutter-box">食品名称</div>
					</Col>
					<Col className="gutter-row" span={20}>
						<Input
							defaultValue={this.state.goodsDetail.name}
							name="name"
							onChange={(e) => {
								this.handleGoodsChange(e);
							}}
						/>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col className="gutter-row" span={4}>
						<div className="gutter-box">食品介绍</div>
					</Col>
					<Col className="gutter-row" span={20}>
						<Input
							defaultValue={this.state.goodsDetail.description}
							name="description"
							onChange={(e) => {
								this.handleGoodsChange(e);
							}}
						/>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col className="gutter-row" span={4}>
						<div className="gutter-box">食品分类</div>
					</Col>
					<Col className="gutter-row" span={20}>
						<select
							className="category-select"
							name="new_category_id"
							onChange={(e) => {
								this.handleGoodsChange(e);
							}}
						>
							{categoryArr}
						</select>
					</Col>
				</Row>
				<div>
					<Button
						type="primary"
						onClick={() => {
							this.addSpecs();
						}}
					>
						添加规格
					</Button>
					<Table
						columns={columns}
						dataSource={this.state.specs}
						rowKey={(record, index) => index}
						pagination={false}
					/>
				</div>
				{/* 弹框 */}
				<Modal
					title="添加规格"
					visible={this.state.specsVisible}
					onOk={() => this.handleVisibleOk()}
					onCancel={() => this.handleVisibleCancel()}
				>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">规格</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Input
								name="specs"
								onChange={(e) => {
									this.handleGoodsChange(e, 'specs');
								}}
							/>
						</Col>
					</Row>
					<div className="goods-specs" style={{ width: '100%', marginTop: 20 }}>
						<Row gutter={16}>
							<Col className="gutter-row" span={4}>
								<div className="gutter-box">包装费</div>
							</Col>
							<Col className="gutter-row" span={10}>
								<InputNumber min={0} max={10} defaultValue={1} onChange={(e) => this.onChangeFree(e)} />
							</Col>
						</Row>
						<Row gutter={16}>
							<Col className="gutter-row" span={4}>
								<div className="gutter-box">价格</div>
							</Col>
							<Col className="gutter-row" span={10}>
								<InputNumber
									min={1}
									max={100}
									defaultValue={20}
									onChange={(e) => this.onChangePrice(e)}
								/>
							</Col>
						</Row>
					</div>
				</Modal>
			</Modal>
		);
	}
}
