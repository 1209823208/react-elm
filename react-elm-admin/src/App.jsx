import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Redirect,Switch } from "react-router-dom";

import './App.css';

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
