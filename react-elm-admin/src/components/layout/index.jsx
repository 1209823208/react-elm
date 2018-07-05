import React from 'react';
import './index.css';
export default class Layout extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div id="wrapper">
        {this.props.children}
      </div> 
    );
  }
}