import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

import './App.scss';
import 'antd/dist/antd.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from 'containers/login/index';
import {route_list} from './routing'
class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					{/* 除了Login这种特殊的路由，其他的.. */}
					<Route path="/" render={(props) => route_list} />
				</Switch>
			</Router>
		);
	}
}

export default App;
