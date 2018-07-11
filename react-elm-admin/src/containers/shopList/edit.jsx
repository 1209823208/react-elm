import React from 'react';
import './index.scss';
import { Modal } from 'antd';
import { Form, Input, Cascader } from 'antd';
import ShopService from 'service/shop-service';
import _URL from 'service/axios-service';
const _shop = new ShopService();
const FormItem = Form.Item;
class ShopEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: this.props.visible || false,
			options: [],
			shopDetail: {},
			loading: false,
		};
	}
	componentWillMount() {
		console.log('componentWillMount');
	}
	componentDidMount() {
		console.log('componentDidMount', this.props.shopDetail);
		const shopDetail = { ...this.props.shopDetail };
		shopDetail.imageUrl = shopDetail.img ? _URL('img/' + shopDetail.img) : '';
		shopDetail.category = shopDetail.category ? shopDetail.category.split('/') : '';
		this.setState(
			{
				shopDetail
			},
			() => {
				this.getCategory();
			}
		);
	}
	componentWillReceiveProps() {
		console.log('componentWillReceiveProps');
	}
	getCategory() {
		_shop.getCategory().then((res) => {
			this.setState({
				options: res
			});
		});
	}
	handleOk = (e) => {
		var formData = this.props.form.getFieldsValue();
		formData.category = formData.category.join('/');
		let params = {...this.state.shopDetail};
		let newObj = Object.assign(params,formData);
		this.updateShopData(newObj);
	};
	updateShopData(params){
		_shop.updateShopData(params).then((res)=>{
			this.props.changeVisible(1);
		})
	}

	handleCancel = (e) => {
		this.props.changeVisible();
	};
	onChange(value) {
		console.log(value);
	}

	render() {
		let { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};
		return (
			<div>
				<Modal title="修改店铺信息" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
					<Form className="login-form">
						<FormItem {...formItemLayout} label="店铺名称">
							{getFieldDecorator('name', { initialValue: this.state.shopDetail.name })(
								<Input placeholder="店铺名称" />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="详细地址">
							{getFieldDecorator('address', { initialValue: this.state.shopDetail.address })(
								<Input placeholder="详细地址" />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="店铺介绍">
							{getFieldDecorator('description', { initialValue: this.state.shopDetail.description })(
								<Input placeholder="店铺介绍" />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="联系电话">
							{getFieldDecorator('phone', { initialValue: this.state.shopDetail.phone })(
								<Input placeholder="联系电话" />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="店铺分类">
							{getFieldDecorator('category', { initialValue: this.state.shopDetail.category })(
								<Cascader options={this.state.options} onChange={this.onChange} />
							)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}
export default (ShopEdit = Form.create({})(ShopEdit));
