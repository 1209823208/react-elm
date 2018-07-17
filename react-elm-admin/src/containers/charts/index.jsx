import React from 'react';
import './index.scss';
import User from 'service/user-service';
import echarts from 'echarts';
const _user = new User();
export default class Visitor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_city: [],
			myChart: '',
			option: {}
		};
	}
	componentDidMount() {
		this.getVisitor();
		this.getInit();
	}
	getVisitor() {
		_user.getVisitor().then((res) => {
			let user_city = res.user_city;
			let series_data = [
				{
					value: typeof user_city['beijing'] !== 'undefined' ? user_city['beijing'] : 0,
					name: '北京'
				},
				{
					value:
						typeof user_city['shanghai'] !== 'undefined' ? user_city['shanghai'] : 0,
					name: '上海'
				},
				{
					value:
						typeof user_city['shenzhen'] !== 'undefined' ? user_city['shenzhen'] : 0,
					name: '深圳'
				},
				{
					value:
						typeof user_city['hangzhou'] !== 'undefined' ? user_city['hangzhou'] : 0,
					name: '杭州'
				},
				{
					value: typeof user_city['qita'] !== 'undefined' ? user_city['qita'] : 0,
					name: '其他'
				}
			];
			let option = { ...this.state.option };
			option.series[0].data = series_data;
			this.state.myChart.setOption(option);
			this.setState({ user_city, option });
		});
	}
	getInit() {
		let _this = this;
		let myChart = echarts.init(document.getElementById('main'));
		// 指定图表的配置项和数据

		var option = {
			title: {
				text: '用户分布',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: [ '北京', '上海', '深圳', '杭州', '其他' ]
			},
			series: [
				{
					name: '',
					type: 'pie',
					radius: '55%',
					center: [ '50%', '60%' ],
					data: [
						{
							value:
								typeof _this.state.user_city['beijing'] !== 'undefined'
									? _this.state.user_city['beijing']
									: 0,
							name: '北京'
						},
						{
							value:
								typeof _this.state.user_city['shanghai'] !== 'undefined'
									? _this.state.user_city['shanghai']
									: 0,
							name: '上海'
						},
						{
							value:
								typeof _this.state.user_city['shenzhen'] !== 'undefined'
									? _this.state.user_city['shenzhen']
									: 0,
							name: '深圳'
						},
						{
							value:
								typeof _this.state.user_city['hangzhou'] !== 'undefined'
									? _this.state.user_city['hangzhou']
									: 0,
							name: '杭州'
						},
						{
							value:
								typeof _this.state.user_city['qita'] !== 'undefined'
									? _this.state.user_city['qita']
									: 0,
							name: '其他'
						}
						// { value: 2249, name: '北京' },
						// { value: 1242, name: '上海' },
						// { value: 1433, name: '深圳' },
						// { value: 795, name: '杭州' },
						// { value: 6048, name: '其他' }
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
		// console.log('option',option);

		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
		var option = myChart.getOption();
		this.setState({
			myChart,
			option
		});
	}
	render() {
		return (
			<div id="visitor">
				<div id="main" style={{ width: '95%', height: 450 }} />
			</div>
		);
	}
}
