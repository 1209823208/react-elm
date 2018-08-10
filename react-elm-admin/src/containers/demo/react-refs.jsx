import React from 'react';
const FancyButton = React.forwardRef((props, ref) => (
	<button ref={ref} className="FancyButton">
		{props.children}
	</button>
));
export default class ReactRefsDemo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const ref = React.createRef();
		return (
			<div>
				<FancyButton ref={ref}>Click me!</FancyButton>
				<div>
					<p>focus实例</p>
					<CustomTextInput />
					<p>回调ref</p>
					<ComeBackCustomTextInput/>
					<p>进入页面自动focus</p>
					<AutoFocusTextInput />
					<p>组件间传递回调形式的 refs</p>
					<Parent/>
				</div>
			</div>
		);
	}
}

class CustomTextInput extends React.Component {
	constructor(props) {
		super(props);
		// create a ref to store the textInput DOM element
		this.textInput = React.createRef();
		console.log('ref-element ', this.textInput);
		this.focusTextInput = this.focusTextInput.bind(this);
	}

	focusTextInput() {
		// Explicitly focus the text input using the raw DOM API
		// Note: we're accessing "current" to get the DOM node
		console.log('ref-element.current ', this.textInput.current);

		this.textInput.current.focus();
	}
	render() {
		// tell React that we want to associate the <input> ref
		// with the `textInput` that we created in the constructor
		return (
			<div>
				<input
					type="text"
					id="textInput"
					className="textInputClass"
					ref={this.textInput} />

				<input
					type="button"
					value="Focus the text input"
					onClick={this.focusTextInput}
				/>
			</div>
		);
	}
}

class AutoFocusTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.textInput = React.createRef();
		console.log('ref-class ', this.textInput);
	}

	componentDidMount() {
		console.log('ref-class.current ', this.textInput.current);
		this.textInput.current.focusTextInput();
	}

	render() {
		return (
			<CustomTextInput ref={this.textInput} />
		);
	}
}
class ComeBackCustomTextInput extends React.Component {
	constructor(props) {
		super(props);

		this.textInput = null;

		this.setTextInputRef = element => {
			this.textInput = element;
			console.log('回掉refs',this.textInput);
		};

		this.focusComeBackTextInput = () => {
			// 直接使用原生 API 使 text 输入框获得焦点
			if (this.textInput) this.textInput.focus();
		};
	}

	componentDidMount() {
		// 渲染后文本框自动获得焦点
		this.focusComeBackTextInput();
	}
	render() {
		// 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 React
		// 实例上（比如 this.textInput）
		return (
			<div>
				<input
					type="text"
					ref={this.setTextInputRef}
				/>
				<input
					type="button"
					value="Focus the text input"
					onClick={this.focusComeBackTextInput}
				/>
			</div>
		);
	}
}



function CustomTextInputFun(props) {
	console.log('组件间传递回调形式的',props.inputRef);
	return (
	  <div>
		<input ref={props.inputRef} />
	  </div>
	);
  }
  
  class Parent extends React.Component {
	render() {
	  return (
		<CustomTextInputFun
		  inputRef={el => this.inputElement = el}
		/>
	  );
	}
  }