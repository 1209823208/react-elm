import React from 'react';
import { Row, Col } from 'antd';
import { Button } from 'antd';

import './index.scss';
import User from 'service/user-service';
import Tendency from 'components/tendency/index';
const _user = new User();
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userCount: 0,
			orderCount: 0,
			adminDayCount: 0,
			getUserCount: 0,
			getOrderCount: 0,
      adminCount: 0,
      sevenDay:[],
      sevenData:[],
      flag:false
		};
	}
	componentDidMount() {
    this.getCount();
    this.getSevenData();
	}
	getCount() {
		_user.getCount().then((res) => {
      this.setState(res);
		});
  }
  getSevenData(){
    _user.getSevenData().then((res)=>{
      this.setState({
        sevenDay:res.sevenDay,
        sevenData:res.resArr,
        flag:true,
      })
    })
  }
  changeFlag(){
    this.setState({
      flag:false,
    })
  }
	render() {
		return (
			<div id="home">
				<h2 style={{textAlign:'center',marginBottom:24}}>数据统计</h2>
				<div className="gutter-example">
					<Row gutter={16}>
						<Col className="gutter-row" span={4}>
							<Button className="gutter-box current-data" type="primary">
								当日数据
							</Button>
						</Col>
						<Col className="gutter-row" span={4}>
							<Button className="gutter-box" type="primary">
              <span className="data-num">{this.state.userCount}</span>
								新增用户
							</Button>
						</Col>
						<Col className="gutter-row" span={4}>
							<Button className="gutter-box" type="primary">
              <span className="data-num">{this.state.orderCount}</span>
								新增订单
							</Button>
						</Col>
						<Col className="gutter-row" span={4}>
							<Button className="gutter-box" type="primary">
              <span className="data-num">{this.state.adminDayCount}</span>
								新增管理员
							</Button>
						</Col>
					</Row>
					<Row gutter={16} className="second-count-margin">
						<Col className="gutter-row" span={4}>
							<Button className="gutter-box all-data" type="primary">
								总数据
							</Button>
						</Col>
						<Col className="gutter-row" span={4}>
							<Button className="gutter-box" type="primary">
              <span className="data-num">{this.state.getUserCount}</span>
								注册用户
							</Button>
						</Col>
						<Col className="gutter-row" span={4}>
							<Button className="gutter-box" type="primary">
              <span className="data-num">{this.state.getOrderCount}</span>
								订单
							</Button>
						</Col>
						<Col className="gutter-row" span={4}>
							<Button className="gutter-box" type="primary">
              <span className="data-num">{this.state.adminCount}</span>
								管理员
							</Button>
						</Col>
					</Row>
				</div>
        <Tendency sevenDay={this.state.sevenDay} sevenData={this.state.sevenData} flag={this.state.flag} changeFlag={this.changeFlag.bind(this)}/>
			</div>
		);
	}
}
