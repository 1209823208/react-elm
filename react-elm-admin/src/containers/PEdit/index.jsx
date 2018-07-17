import React from 'react';
import './index.scss';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import PropTypes from 'prop-types';
import { Button, message } from 'antd';
/* 
 * Simple editor component that takes placeholder text as a prop 
 */
export default class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = { editorHtml: '' };
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(html) {
		this.setState({ editorHtml: html }, () => {
			console.log('this.state', this.state);
		});
	}
	addEditor() {
		message.info('提交成功，无接口 ');
	}
	render() {
		return (
			<div>
				<ReactQuill
					style={{ height: 200 }}
					onChange={this.handleChange}
					value={this.state.editorHtml}
					modules={Editor.modules}
					formats={Editor.formats}
					placeholder={this.props.placeholder}
				/>
				<Button
					type="primary"
					onClick={() => {
						this.addEditor();
					}}
				>
					提交
				</Button>
			</div>
		);
	}
}

/* 
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
Editor.modules = {
	toolbar: [
		[ { header: '1' }, { header: '2' }, { font: [] } ],
		[ { size: [] } ],
		[ 'bold', 'italic', 'underline', 'strike', 'blockquote' ],
		[ { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' } ],
		[ 'link', 'image', 'video' ],
		[ 'clean' ]
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false
	}
};
/* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
Editor.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'video'
];

/* 
   * PropType validation
   */
Editor.propTypes = {
	placeholder: PropTypes.string
};
