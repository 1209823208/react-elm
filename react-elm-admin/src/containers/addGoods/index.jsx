import React from 'react';
import './index.scss';
import { Row, Col, Input, Button, message, TreeSelect, Radio, InputNumber, Table, Modal } from 'antd';
import GoodsService from 'service/goods-service';
const TreeNode = TreeSelect.TreeNode;
const _goods = new GoodsService();
const RadioGroup = Radio.Group;

export default class AddGoods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurant_id: this.props.match.params.restaurant_id || '',
			categoryList: [],
			showCategory: false,
			addcategory: {
				description: '',
				name: ''
			},
			addGoods: {
				// 存储商品信息
				activity: '',
				attributes: [],
				description: '',
				image_path: '1648d662df917038.png',
				name: '',
				specs: [],
				category_id: ''
			},
			radioValue: 1,
			specsArr: [
				// 存储规格
				{
					specs: '默认',
					packing_fee: 0,
					price: 20,
					key: 0
				}
			],
			visible: false, //弹框显示与否
			specs_name: '', //多规格名称-临时
			specs_free: 0, //多规格包装费-临时
			specs_price: 20 //多规格价格-临时
		};
	}
	componentDidMount() {
		//获取分类
		this.getCategoryBytaurants();
	}
	getCategoryBytaurants() {
		let restaurant_id = this.state.restaurant_id;
		_goods.getCategoryBytaurants(restaurant_id).then((res) => {
			let res_category_list = res.category_list;
			this.setState({
				categoryList: res_category_list
			});
		});
	}
	handleChange(e) {
		let s = { ...this.state.addcategory };
		s[e.target.name] = e.target.value;
		this.setState({
			addcategory: s
		});
	}
	handleGoodsChange(e, flag = '') {
		if (flag === 'specs') {
			this.setState({
				specs_name: e.target.value
			});
		} else {
			let s = { ...this.state.addGoods };
			s[e.target.name] = e.target.value;
			this.setState({
				addGoods: s
			});
		}
	}
	onChangeTree = (value) => {
		let s = { ...this.state.addGoods };
		s.attributes = value;
		this.setState({
			addGoods: s
		});
	};
	onChangeRadioValue() {
		let s = this.state.radioValue === 1 ? 2 : 1;
		let newSpecsArr = [
			// 存储规格
			{
				specs: '默认',
				packing_fee: 0,
				price: 20,
				key: 0
			}
		];
		this.setState({
			radioValue: s,
			specsArr: newSpecsArr
		});
	}
	onChangeFree(value, flag = '') {
		if (flag === 'specs') {
			this.setState({
				specs_free: value
			});
		} else {
			let m = this.state.specsArr;
			m.packing_fee = value;
			this.setState({
				specsArr: m
			});
		}
	}
	onChangePrice(value, flag = '') {
		if (flag === 'specs') {
			this.setState({
				specs_price: value
			});
		} else {
			let m = this.state.specsArr;
			m.price = value;
			this.setState({
				specsArr: m
			});
		}
	}
	// 展示食品种类DOM
	show_category() {
		let flg = !this.state.showCategory;
		this.setState({
			showCategory: flg
		});
	}
	// 添加食品种类-请求接口
	addCategory() {
		let params = { ...this.state.addcategory };
		params.restaurant_id = this.state.restaurant_id;
		_goods.addCategory(params).then((res) => {
			message.info(res.success);
			this.setState({
				showCategory: false
			});
			this.getCategoryBytaurants();
		});
	}
	// 添加食品-请求接口
	addgoods() {
		let params = { ...this.state.addGoods };
		params.restaurant_id = this.state.restaurant_id;
		params.specs = this.state.specsArr;
		if (params.category_id === '') {
			message.info('请选择食品种类');
			return '';
		}
		if (params.name === '') {
			message.info('食品名称不能为空');
			return '';
		}
		_goods.addGoods(params).then((res) => {
			message.info(res.success);
			if (res.status === 1) {
				// clear input
				console.log('this.refs', this.refs);
				let newAddGoods = {
					// 存储商品信息
					activity: '',
					attributes: [],
					description: '',
					image_path: '1648d662df917038.png',
					name: '',
					specs: [],
					category_id: ''
				};
				let newSpecsArr = [
					// 存储规格
					{
						specs: '默认',
						packing_fee: 0,
						price: 20,
						key: 0
					}
				];
				this.setState(
					{
						addGoods: newAddGoods,
						specsArr: newSpecsArr
					},
					() => {
						console.log('this.state', this.state);
					}
				);
			}
		});
	}
	//移除规格
	removeSpecs(id) {
		let m = this.state.specsArr;
		if (m.length > 0) {
			m.splice(id);
			this.setState({
				specsArr: m
			});
		}
	}
	// 添加规格
	addSpecs() {
		this.setState({
			visible: true
		});
	}
	// 弹框显示与闭合
	handleOk = (e) => {
		if (this.state.specs_name === '') {
			message.info('规格不能为空');
			return '';
		}
		let newSpecsArr = this.state.specsArr;
		for (let val of newSpecsArr) {
			if (val.specs === this.state.specs_name) {
				message.info('规格重复');
				return '';
			}
		}
		let newObj = {
			specs: this.state.specs_name,
			packing_fee: this.state.specs_free,
			price: this.state.specs_price,
			key: newSpecsArr.length
		};
		newSpecsArr.push(newObj);
		this.setState({
			specsArr: newSpecsArr,
			visible: false
		});
	};
	// 关闭弹框
	handleCancel = (e) => {
		this.setState({
			visible: false
		});
	};

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
				dataIndex: 'specs',
				key: 'specs'
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
				render: (text, record) => (
					<span>
						<a
							href="javascript:;"
							onClick={() => {
								this.removeSpecs(record.key);
							}}
						>
							删除
						</a>
					</span>
				)
			}
		];
		return (
			<div id="addGoods">
				<p>选择食品种类</p>
				<div className="shop-category">
					<div className="shop-big-category">
						<Row gutter={16}>
							<Col className="gutter-row" span={4}>
								<div className="gutter-box">食品种类</div>
							</Col>
							<Col className="gutter-row" span={20}>
								<select
									className="category-select"
									name="category_id"
									onChange={(e) => {
										this.handleGoodsChange(e);
									}}
								>
									{categoryArr}
								</select>
							</Col>
						</Row>
					</div>
					<div className="shop-category-desc" style={{ display: this.state.showCategory ? 'block' : 'none' }}>
						<Row gutter={16}>
							<Col className="gutter-row" span={4}>
								<div className="gutter-box">食品种类</div>
							</Col>
							<Col className="gutter-row" span={20}>
								<Input
									name="name"
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col className="gutter-row" span={4}>
								<div className="gutter-box">种类描述</div>
							</Col>
							<Col className="gutter-row" span={20}>
								<Input
									name="description"
									onChange={(e) => {
										this.handleChange(e);
									}}
								/>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col className="gutter-row" span={4} />
							<Col className="gutter-row" span={20} style={{ textAlign: 'left' }}>
								<Button
									type="primary"
									onClick={() => {
										this.addCategory();
									}}
								>
									提交
								</Button>
							</Col>
						</Row>
					</div>
					<div
						className="add_category_button"
						onClick={() => {
							this.show_category();
						}}
					>
						<i
							className={this.state.showCategory ? 'fa fa-sort-up' : 'fa fa-sort-desc'}
							aria-hidden="true"
						/>{' '}
						<span>添加食品种类</span>
					</div>
				</div>

				<div className="goods-mes">
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">食品名称</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Input
								defaultValue={this.state.addGoods.name}
								ref="goods_name"
								name="name"
								onChange={(e) => {
									this.handleGoodsChange(e);
								}}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">食品活动</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Input
								defaultValue={this.state.addGoods.activity}
								ref="goods_activity"
								name="activity"
								onChange={(e) => {
									this.handleGoodsChange(e);
								}}
							/>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">食品详情</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<Input
								defaultValue={this.state.addGoods.description}
								ref="goods_description"
								name="description"
								onChange={(e) => {
									this.handleGoodsChange(e);
								}}
							/>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">食品特点</div>
						</Col>
						<Col className="gutter-row" span={20}>
							<TreeSelect
								showSearch
								style={{ width: '100%' }}
								value={this.state.addGoods.attributes}
								dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
								placeholder="Please select"
								allowClear
								multiple
								treeDefaultExpandAll
								onChange={(e) => this.onChangeTree(e)}
							>
								<TreeNode value="新" title="新品" key="1" />
								<TreeNode value="招牌" title="招牌" key="2" />
							</TreeSelect>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<div className="gutter-box">食品规格</div>
						</Col>
						<Col className="gutter-row" span={20} style={{ textAlign: 'left' }}>
							<RadioGroup onChange={() => this.onChangeRadioValue()} value={this.state.radioValue}>
								<Radio value={1}>单规格</Radio>
								<Radio value={2}>多规格</Radio>
							</RadioGroup>
						</Col>
					</Row>
					{this.state.radioValue === 1 ? (
						<div className="goods-specs">
							<Row gutter={16}>
								<Col className="gutter-row" span={4}>
									<div className="gutter-box">包装费</div>
								</Col>
								<Col className="gutter-row" span={10}>
									<InputNumber
										min={0}
										max={10}
										defaultValue={this.state.specsArr[0].packing_fee}
										onChange={(e) => this.onChangeFree(e)}
									/>
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
										defaultValue={this.state.specsArr[0].price}
										onChange={(e) => this.onChangePrice(e)}
									/>
								</Col>
							</Row>
						</div>
					) : (
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
								dataSource={this.state.specsArr}
								rowKey={(record) => record.specs}
								pagination={false}
							/>
						</div>
					)}
					<Button
						type="primary"
						onClick={() => {
							this.addgoods();
						}}
					>
						确认添加食品
					</Button>
				</div>
				{/* 弹框 */}
				<Modal
					title="添加规格"
					visible={this.state.visible}
					onOk={() => this.handleOk()}
					onCancel={() => this.handleCancel()}
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
								<InputNumber
									min={0}
									max={10}
									defaultValue={0}
									onChange={(e) => this.onChangeFree(e, 'specs')}
								/>
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
									onChange={(e) => this.onChangePrice(e, 'specs')}
								/>
							</Col>
						</Row>
					</div>
				</Modal>
			</div>
		);
	}
}
