import React from 'react';
import PropTypes from 'prop-types';

export default class PropTypesDemo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h1>propTypes </h1>
				<MyComponent>
					<p>weewe</p>
				</MyComponent>
			</div>
		);
	}
}
class MyComponent extends React.Component {
	render() {
		// 这里必须是一个元素，否则会发出警告。
		const children = this.props.children;
		return (
			<div>
				<h1>{this.props.name}</h1>
				{children}
			</div>
		);
	}
}

MyComponent.propTypes = {
	children: PropTypes.element.isRequired
};
// 指定 props 的默认值：
MyComponent.defaultProps = {
	name: 'Stranger'
  };