import React from 'react';
import './index.scss';
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/tooltip';
export default class Tendency extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sevenDay:[],
			sevenData:[],
			flag:false
		};
	}
	componentDidMount(){
		// this.getInit()
	}
	componentDidUpdate(prevProps){
		if(this.props.flag && this.props.sevenDay.length>0){
			let sevenDay = this.props.sevenDay;
			let sevenData = this.props.sevenData;
			this.setState({
				sevenDay:sevenDay,
				sevenData:sevenData,
			},()=>{
				this.getInit();	
			})	
			this.props.changeFlag();
		}
	}
	getInit(){
		let myChart = echarts.init(document.getElementById('main'));
		// 指定图表的配置项和数据
		const colors = ['#5793f3', '#675bba', '#d14a61'];

        var option = {
			color: colors,
            title: {
                text: '走势图'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data:['新注册用户','新增订单','新增管理员']
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: {readOnly: false},
					magicType: {type: ['line', 'bar']},
					restore: {},
					saveAsImage: {}
				}
			},
            xAxis: {
				type: 'category',
				boundaryGap: false,
				data: this.state.sevenDay
			},
			yAxis: [
				{
				  type: 'value',
				  name: '用户',
				  min: 0,
				  max: 200,
				  position: 'left',
				  axisLine: {
					  lineStyle: {
						  color: '#999'
					  }
				  },
				  axisLabel: {
					  formatter: '{value}'
				  }
				},
				{
				  type: 'value',
				  name: '订单',
				  min: 0,
				  max: 200,
				  position: 'right',
				  axisLine: {
					  lineStyle: {
						  color: '#999'
					  }
				  },
				  axisLabel: {
					  formatter: '{value}'
				  }
				},
			],
			series: [
				{
					name:'新注册用户',
					type:'line',
					data:this.state.sevenData[0],
					markPoint: {
						data: [
							{type: 'max', name: '最大值'},
							{type: 'min', name: '最小值'}
						]
					}
				},
				{
					name:'新增订单',
					type:'line',
					data:this.state.sevenData[1],
					markPoint: {
						data: [
							{type: 'max', name: '最大值'},
							{type: 'min', name: '最小值'}
						]
					}
				},
				{
					name:'新增管理员',
					type:'line',
					data:this.state.sevenData[2],
					markPoint: {
						data: [
							{type: 'max', name: '最大值'},
							{type: 'min', name: '最小值'}
						]
					}
				},
			]
		};
		// console.log('option',option);

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
	}
	render() {
		return (
			<div id="main" style={{width: '95%',height:450}}></div>
		);
	}
}
