import React from 'react';
function getDisplayName(component) {
	return component.displayName || component.name || 'Component';
}
function withHeader(WrappedComponent, params) {
	return class HOC extends React.Component {
		static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
		proc(wrappedComponentInstance) {
			wrappedComponentInstance.method()
		};
		render() {
			const newProps = {
				test: 'hoc'
			};
			const props = Object.assign({}, this.props, {ref: this.proc.bind(this)});
			return (
				<div>
					<div className="demo-header">{
						params ? params : '我是标题'
					}</div>
					<WrappedComponent {...this.props} {...newProps} />
				</div>
			)
		}
	}
}

class HigherOrderComponentDome extends React.Component {
	constructor(props) {
		super(props);
		console.log('props', props);
	}
	render() {
		return (
			<div>
				我是一个普通组件
      		</div>
		);
	}
}
export default HigherOrderComponentDome = withHeader(HigherOrderComponentDome, 'title');

