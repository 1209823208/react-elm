import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

export default class ReactPortalsDemo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<div id="app-root">
					<ShowModal />
				</div>
				<div id="modal-root"></div>
			</div>
		);
	}
}
class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement('div');
	}
	componentDidMount() {
		const modalRoot = document.getElementById('modal-root');
		modalRoot.appendChild(this.el);
	}

	componentWillUnmount() {
		const modalRoot = document.getElementById('modal-root');
		modalRoot.removeChild(this.el);
	}

	render() {
		return ReactDOM.createPortal(
			this.props.children,
			this.el,
		);
	}
}

class ShowModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showModal: false };
		this.handleShow = this.handleShow.bind(this);
		this.handleHide = this.handleHide.bind(this);
	}

	handleShow() {
		this.setState({ showModal: true });
	}

	handleHide() {
		this.setState({ showModal: false });
	}
	render() {
		const modal = this.state.showModal ? (
			<Modal>
				<div className="modal">
					<div>{this.props.name}</div>
					<div>
						With a portal, we can render content into a different
						part of the DOM, as if it were any other React child.
					</div>
					This is being rendered inside the #modal-container div.
          			<button onClick={this.handleHide}>Hide modal</button>
				</div>
			</Modal>
		) : null;
		return (
			<div className="app">
				This div has overflow: hidden.
        		<button onClick={this.handleShow}>Show modal</button>
				{modal}
			</div>
		);
	}
}
ShowModal.defaultProps = {
	name: 'Mary'
  };
