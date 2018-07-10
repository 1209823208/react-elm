import React from 'react';
import './index.scss';
import { Modal } from 'antd';
import { Form, Input, Select } from 'antd';
import { Cascader } from 'antd';
import ShopService from 'service/shop-service';
const _shop = new ShopService();
const FormItem = Form.Item;
class ShopEdit extends React.Component {
	constructor(props) {
		super(props);
		const shopDetail = this.props.shopDetail || {};
		this.state = {
			visible: this.props.visible || false,
			shopDetail: shopDetail,
			options: []
		};
	}
	componentDidUpdate(prevProps) {
		if (this.props.visible != prevProps.visible) {
			this.setState({
				visible: this.props.visible
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log('222');
		// Should be a controlled component.
		if ('shopDetail' in nextProps) {
			const shopDetail = nextProps.shopDetail;
			this.setState(shopDetail);
			this.setState({
				category: [ 'zhejiang', 'hangzhou', 'xihu' ]
			});
			this.getCategory();
			console.log('this.state1', this.state);
		}
	}
	getCategory() {
		_shop.getCategory((res) => {
			console.log('res',res);
			this.setState({
				options: res
			});
		});
	}
	handleOk = (e) => {
		// this.setState({
		// 	visible: false
		// });
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
	};

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false
		});
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
							{getFieldDecorator('name', { initialValue: this.state.name })(<Input placeholder="店铺名称" />)}
						</FormItem>
						<FormItem {...formItemLayout} label="详细地址">
							{getFieldDecorator('address', { initialValue: this.state.address })(
								<Input placeholder="详细地址" />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="店铺介绍">
							{getFieldDecorator('description', { initialValue: this.state.description })(
								<Input placeholder="店铺介绍" />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="联系电话">
							{getFieldDecorator('phone', { initialValue: this.state.phone })(
								<Input placeholder="联系电话" />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="店铺分类">
							{getFieldDecorator('category', { initialValue: this.state.category })(
								<Cascader options={this.state.options} onChange={this.onChange} />
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="商品图片">
							{getFieldDecorator('img', { initialValue: this.state.address })(
								<Input placeholder="商品图片" />
							)}
						</FormItem>
					</Form>
				</Modal>
			</div>
		);
	}
}
export default (ShopEdit = Form.create({})(ShopEdit));
