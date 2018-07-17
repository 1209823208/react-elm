import React from 'react';
import './index.scss';
import {
	Row,
	Col,
	Input,
	Button,
	message,
	TreeSelect,
	Radio,
	Cascader,
	Switch,
	InputNumber,
	TimePicker,
	Select,
	Table,
	Modal
} from 'antd';
import moment from 'moment';
import ShopService from 'service/shop-service';
const TreeNode = TreeSelect.TreeNode;
const _shop = new ShopService();
const RadioGroup = Radio.Group;
const Option = Select.Option;
const format = 'HH:mm';

export default class AddShop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurant_id: this.props.match.params.restaurant_id || '',
			categoryList: [],
			addshopMes: {
				// 存储商品信息
				address: '',
				business_license_image: '164a232e2fa17347.png',
				category: '',
				category_arr: [],
				catering_service_license_image: '164a2330d7c17348.png',
				description: '',
				startTime: '00:00',
				endTime: '00:00',
				float_delivery_fee: 5,
				float_minimum_order_amount: 20,
				image_path: '164a232f1c017346.png',
				latitude: '',
				longitude: '',
				name: '',
				phone: '',
				promotion_info: '',
				bao: true,
				delivery_mode: true,
				is_premium: true,
				new: true,
				piao: true,
				zhun: true,
				activities: [
					{
						icon_name: '减',
						name: '满减优惠',
						description: '满30减5，满60减8'
					}
				]
			},
			radioValue: 1,
			visible: false, //弹框显示与否
			tipMes: '', //提示-暂存
			active_flag: 1 //  活动-类型
		};
	}
	componentDidMount() {
		//获取分类
		this.getCategory();
		//获取latitude+longitude
		this.getCurrentCity();
	}
	getCategory() {
		_shop.getCategory().then((res) => {
			console.log('res', res);
			if (res && res.length > 0) {
				let category_one = res[0].value,
					category_two =
						typeof res[0].children !== 'undefined' && res[0].children.length > 1
							? res[0].children[1].value
							: '';
				let newAddShopMes = { ...this.state.addshopMes };
				newAddShopMes.category = category_one + '/' + category_two;
				newAddShopMes.category_arr = [ category_one, category_two ];
				this.setState({
					addshopMes: newAddShopMes,
					categoryList: res
				});
			}
		});
	}
	//获取latitude+longitude
	getCurrentCity() {
		let params = {
			type: 'guess'
		};
		_shop.getCurrentCity(params).then((res) => {
			let s = { ...this.state.addshopMes };
			s.latitude = res.latitude;
			s.longitude = res.longitude;
			this.setState({
				addshopMes: s
			});
		});
	}
	handleShopChange(e) {
		let name = e.target.name,
			val = e.target.value;
		if (e.target.name === 'tipMes') {
			this.setState({
				tipMes: val
			});
		} else {
			let s = { ...this.state.addshopMes };
			s[name] = val;
			this.setState({
				addshopMes: s
			});
		}
	}
	// 店铺分类+店铺特点+营业时间
	onChange(val, flag, timeString = '') {
		if (flag === 'category') {
			let m = val.join('/');
			let newAddShopMes = { ...this.state.addshopMes };
			newAddShopMes.category = m;
			newAddShopMes.category_arr = val;
			this.setState({
				addshopMes: newAddShopMes
			});
		} else if (flag === 'startTime' || flag === 'endTime') {
			let newAddShopMes = { ...this.state.addshopMes };
			newAddShopMes[flag] = timeString;
			this.setState({
				addshopMes: newAddShopMes
			});
		} else {
			let newAddShopMes = { ...this.state.addshopMes };
			newAddShopMes[flag] = val;
			this.setState({
				addshopMes: newAddShopMes
			});
		}
	}
	// 活动选择
	handleActiveChange(value) {
		this.setState({
			active_flag: value,
			visible: true
		});
	}
	// 弹框确定-取消
	handleOk = (e) => {
		if (this.state.tipMes === '') {
			message.info('活动名称不能为空');
			return '';
		}
		let params = { ...this.state.addshopMes };
		let newActive = {
			icon_name: '减',
			name: '满减优惠',
			description: this.state.tipMes
		};
		if (this.state.active_flag === 2) {
			newActive = {
				icon_name: '特',
				name: '优惠大酬宾',
				description: this.state.tipMes
			};
		} else if (this.state.active_flag === 3) {
			newActive = {
				icon_name: '新',
				name: '新用户立减',
				description: this.state.tipMes
			};
		} else if (this.state.active_flag === 4) {
			newActive = {
				icon_name: '领',
				name: '进店领券',
				description: this.state.tipMes
			};
		}
		params.activities.push(newActive);
		this.setState({
			visible: false,
			addshopMes: params
		});
	};

	handleCancel = (e) => {
		this.setState({
			visible: false,
			tipMes: ''
		});
	};

	// 删除活动
	delActive(index) {
		let m = this.state.addshopMes.activities;
		if (m.length > 0) {
			m.splice(index, 1);
			let newAddShopMes = { ...this.state.addshopMes };
			newAddShopMes.activities = m;
			this.setState({
				addshopMes: newAddShopMes
			});
		}
	}
	// 添加食品-请求接口
	addshopApi() {
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
			if (res.status === 1) {
				// clear input
				let newAddShop = {
					// 存储商品信息
					address: '',
					business_license_image: '164a232e2fa17347.png',
					category: '',
					category_arr: [],
					catering_service_license_image: '164a2330d7c17348.png',
					description: '',
					startTime: '00:00',
					endTime: '00:00',
					float_delivery_fee: 5,
					float_minimum_order_amount: 20,
					image_path: '164a232f1c017346.png',
					latitude: '',
					longitude: '',
					name: '',
					phone: '',
					promotion_info: '',
					bao: true,
					delivery_mode: true,
					is_premium: true,
					new: true,
					piao: true,
					zhun: true,
					activities: [
						{
							icon_name: '减',
							name: '满减优惠',
							description: '满30减5，满60减8'
						}
					]
				};
				this.setState(
					{
						addshopMes: newAddShop
					},
					() => {
						console.log('this.state', this.state);
					}
				);
				message.info(res.sussess);
			} else {
				message.info(res.message);
			}
		});
	}

	render() {
		const columns = [
			{
				title: '活动标题',
				dataIndex: 'icon_name',
				key: 'icon_name'
			},
			{
				title: '活动名称',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: '活动详情',
				dataIndex: 'description',
				key: 'description'
			},
			{
				title: 'Action',
				key: 'action',
				render: (text, record, index) => (
					<span>
						<a href="javascript:;" onClick={() => this.delActive(index)}>
							Delete
						</a>
					</span>
				)
			}
		];
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
								value={this.state.addshopMes.category_arr}
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
								value={this.state.addshopMes.float_delivery_fee}
								onChange={(value) => this.onChange(value, 'float_delivery_fee')}
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
								value={this.state.addshopMes.float_minimum_order_amount}
								onChange={(value) => this.onChange(value, 'float_minimum_order_amount')}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">营业时间</div>
						</Col>
						<Col className="gutter-row" span={10}>
							<TimePicker
								defaultValue={moment('00:00', format)}
								value={moment(this.state.addshopMes.startTime, format)}
								format={format}
								onChange={(val, timeString) => this.onChange(val, 'startTime', timeString)}
							/>
							<TimePicker
								defaultValue={moment('00:00', format)}
								value={moment(this.state.addshopMes.endTime, format)}
								format={format}
								onChange={(val, timeString) => this.onChange(val, 'endTime', timeString)}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">优惠活动</div>
						</Col>
						<Col className="gutter-row" span={10}>
							<p>请输入活动详情</p>
							<Select
								style={{ width: 200 }}
								placeholder="Select a person"
								onChange={(val) => this.handleActiveChange(val)}
								defaultValue="1"
							>
								<Option value="1">满减优惠</Option>
								<Option value="2">优惠大酬宾</Option>
								<Option value="3">新用户立减</Option>
								<Option value="4">进店领券</Option>
							</Select>,
						</Col>
					</Row>
					<Table
						columns={columns}
						dataSource={this.state.addshopMes.activities}
						rowKey={(record, index) => index}
						pagination={false}
					/>
					<Button
						type="primary"
						onClick={() => {
							this.addshopApi();
						}}
					>
						确认添加店铺
					</Button>
				</div>
				<Modal title="提示" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
					<Input
						value={this.state.tipMes}
						name="tipMes"
						onChange={(e) => {
							this.handleShopChange(e);
						}}
					/>
				</Modal>
			</div>
		);
	}
}
