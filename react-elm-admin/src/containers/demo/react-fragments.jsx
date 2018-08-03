import React from 'react';

export default class ReactFragmentsDemo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const ref = React.createRef();
		return (
			<div>
				<table>
					<tbody>
						<Columns />
					</tbody>
				</table>
			</div>
		);
	}
}
class Columns extends React.Component {
	render() {
		const table_data = [
			{
				id: 1,
				term: 'pip',
				description: 'description pip'
			},
			{
				id: 2,
				term: 'pip2',
				description: 'description pip2'
			}
		]
		return (
			<React.Fragment>
				{table_data.map(item => (
					// 没有`key`，将会触发一个key警告
					<React.Fragment key={item.id}>
						<tr>
							<td>{item.term}</td>
							<td>{item.description}</td>
						</tr>
					</React.Fragment>
				))}
			</React.Fragment>
		);
	}
}


