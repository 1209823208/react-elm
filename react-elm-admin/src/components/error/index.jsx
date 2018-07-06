import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class ErrorPage extends React.Component {
	render() {
		return (
			<div id="error">
				<div className="row">
					<div className="col-md-12">
						<span>出错了~</span>
						<Link to="/">
							<p>点我返回</p>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
