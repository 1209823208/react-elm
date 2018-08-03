import React from 'react';
import img from 'images/43.jpg';

export default class RenderProps extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h1>Move the mouse around!</h1>
				<Mouse render={mouse => (
					<Cat mouse={mouse} />
				)} />
			</div>
		);
	}
}
class Cat extends React.Component {
	render() {
		const mouse = this.props.mouse;
		return (
			<img src={img} style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
		);
	}
}
class Mouse extends React.Component {
	constructor(props) {
		super(props);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.state = { x: 264, y: 150 };
	}

	handleMouseMove(event) {
		this.setState({
			x: event.clientX,
			y: event.clientY
		});
	}
	render() {
		return (
			<div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

				{this.props.render(this.state)}
			</div>
		);
	}
}
