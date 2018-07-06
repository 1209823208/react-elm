import React from 'react';
import './index.scss';
import { Layout} from 'antd';
const {Footer } = Layout;
export default class NavFooter extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
		);
	}
}
