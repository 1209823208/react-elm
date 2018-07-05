import React from 'react';
import './index.css';
export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userCount:'',
      productCount:'',
      orderCount:''
    }
  }
  render() {
    return (
      <div id="home">
          Home
      </div>
    );
  }
}
