import React from 'react';
import './index.scss';
import User from 'service/user-service';
const _user = new User();
export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userCount:0,
      orderCount:0,
      adminDayCount:0,
      getUserCount:0,
      getOrderCount:0,
      adminCount:0
    }
  }
  componentDidMount(){
    this.getCount();
  }
  getCount(){
    _user.getCount().then((res)=>{
      this.state = res;
    });
  }
  render() {
    return (
      <div id="home">
          Home
      </div>
    );
  }
}
