import React from 'react';
import './index.scss';
import { Row, Col, Input, Button, message, TreeSelect, Radio, Cascader, Switch, InputNumber, Table, Modal } from 'antd';
import ShopService from 'service/shop-service';
const TreeNode = TreeSelect.TreeNode;
const _shop = new ShopService();
const RadioGroup = Radio.Group;

export default class AddShop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurant_id: this.props.match.params.restaurant_id || '',
			categoryList: [],
			addshopMes: {
				// 存储商品信息
				address: '地铁11号线支线,地铁11号线',
				bao: true,
				business_license_image: '164a232e2fa17347.png',
				category: '特色菜系/海鲜',
				category_arr: [ '特色菜系', '海鲜' ],
				catering_service_license_image: '164a2330d7c17348.png',
				delivery_mode: true,
				description: 'eede',
				endTime: '06:30',
				float_delivery_fee: 5,
				float_minimum_order_amount: 20,
				image_path: '164a232f1c017346.png',
				is_premium: true,
				latitude: 31.262685,
				longitude: 121.401067,
				name: '334',
				new: true,
				phone: 151551515,
				piao: true,
				promotion_info: 'dede',
				startTime: '06:15',
				zhun: true,
				activities: []
			},
			radioValue: 1,
			visible: false //弹框显示与否
		};
	}
	componentDidMount() {
		//获取分类
		this.getCategory();
	}
	getCategory() {
		_shop.getCategory().then((res) => {
			this.setState({
				categoryList: res
			});
		});
	}
	handleShopChange(e) {
		let s = { ...this.state.addshopMes };
		s[e.target.name] = e.target.value;
		this.setState({
			addshopMes: s
		});
	}
	onChangeFree(value) {
		let s = { ...this.state.addshopMes };
		s.float_delivery_fee = value;
		this.setState({
			addshopMes: s
		});
	}
	onChangePrice(value) {
		let s = { ...this.state.addshopMes };
		s.float_minimum_order_amount = value;
		this.setState({
			addshopMes: s
		});
	}
	// 店铺特点
	onChange(val, flag) {}
	// 添加食品-请求接口
	addshop() {
		let params = { ...this.state.addshopMes };
		if (params.name === '') {
			message.info('店铺名称不能为空');
			return '';
		}
		if (params.address === '') {
			message.info('详细地址不能为空');
			return '';
		}
		_shop.addShop(params).then((res) => {
			message.info(res.success);
			if (res.status === 1) {
				// clear input
				let newAddShop = {
					// 存储商品信息
					address: '',
					business_license_image: '164a232e2fa17347.png',
					category: '',
					catering_service_license_image: '164a2330d7c17348.png',
					description: '',
					endTime: '',
					float_delivery_fee: 5,
					float_minimum_order_amount: 20,
					image_path: '164a232f1c017346.png',
					is_premium: true,
					delivery_mode: true,
					new: true,
					bao: true,
					zhun: true,
					piao: true,
					latitude: 31.262685,
					longitude: 121.401067,
					name: '',
					phone: '',
					promotion_info: '',
					startTime: '',
					activities: []
				};
				this.setState({
					addShop: newAddShop
				});
			}
		});
	}

	render() {
		return (
			<div id="addShop">
				<div className="shop-mes">
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">店铺名称</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Input
								value={this.state.addshopMes.name}
								name="name"
								onChange={(e) => {
									this.handleShopChange(e);
								}}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">详细地址</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Input
								value={this.state.addshopMes.address}
								name="address"
								onChange={(e) => {
									this.handleShopChange(e);
								}}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">联系电话</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Input
								value={this.state.addshopMes.phone}
								name="phone"
								onChange={(e) => {
									this.handleShopChange(e);
								}}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">店铺简介</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Input
								value={this.state.addshopMes.description}
								name="description"
								onChange={(e) => {
									this.handleShopChange(e);
								}}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">店铺标语</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Input
								value={this.state.addshopMes.promotion_info}
								name="promotion_info"
								onChange={(e) => {
									this.handleShopChange(e);
								}}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">店铺分类</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Cascader
								defaultValue={this.state.addshopMes.category_arr}
								options={this.state.categoryList}
								onChange={(value) => this.onChange(value, 'category')}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">店铺特点</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Row gutter={16}>
								<Col className="gutter-switch" span={5}>
									<Switch
										defaultChecked
										checked={this.state.addshopMes.is_premium}
										onChange={(value) => this.onChange(value, 'is_premium')}
									/>品牌保证
								</Col>
								<Col className="gutter-switch" span={5}>
									<Switch
										defaultChecked
										checked={this.state.addshopMes.delivery_mode}
										onChange={(value) => this.onChange(value, 'delivery_mode')}
									/>蜂鸟专送
								</Col>
								<Col className="gutter-switch" span={5}>
									<Switch
										defaultChecked
										checked={this.state.addshopMes.new}
										onChange={(value) => this.onChange(value, 'new')}
									/>新开店铺
								</Col>
								<br style={{ clear: 'both' }} />
								<Col className="gutter-switch" span={5}>
									<Switch
										defaultChecked
										checked={this.state.addshopMes.bao}
										onChange={(value) => this.onChange(value, 'bao')}
									/>外卖保
								</Col>
								<Col className="gutter-switch" span={5}>
									<Switch
										defaultChecked
										checked={this.state.addshopMes.zhun}
										onChange={(value) => this.onChange(value, 'zhun')}
									/>准时达
								</Col>
								<Col className="gutter-switch" span={5}>
									<Switch
										defaultChecked
										checked={this.state.addshopMes.piao}
										onChange={(value) => this.onChange(value, 'piao')}
									/>开发票
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={16}>
							<Col className="gutter-row" span={4}>
								<div className="gutter-box">配送费</div>
							</Col>
							<Col className="gutter-row" span={10}>
								<InputNumber
									min={1}
									max={100}
									defaultValue={5}
									value = {this.state.addshopMes.float_delivery_fee}
									onChange={(e) => this.onChangeFree(e)}
								/>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col className="gutter-row" span={4}>
								<div className="gutter-box">起送价</div>
							</Col>
							<Col className="gutter-row" span={10}>
								<InputNumber
									min={1}
									max={100}
									defaultValue={20}
									value = {this.state.addshopMes.float_minimum_order_amount}
									onChange={(e) => this.onChangePrice(e)}
								/>
							</Col>
						</Row>
					<Button
						type="primary"
						onClick={() => {
							this.addShop();
						}}
					>
						确认添加店铺
					</Button>
				</div>
			</div>
		);
	}
}
