import React from 'react';
import { message } from 'antd';

import { Route, Switch, Redirect } from 'react-router-dom';

import LayoutIndex from 'components/layout/index';
import ErrorPage from 'components/error/index';
import Home from 'containers/home/index';
import UserList from 'containers/userList/index';
import ShopList from 'containers/shopList/index';
import AddGoods from 'containers/goodsList/add';
import GoodsList from 'containers/goodsList/index';
import OrderList from 'containers/orderList/index';
import AdminList from 'containers/adminList/index';
import AddShop from 'containers/shopList/add';
import Visitor from 'containers/charts/index';
import Editor from 'containers/PEdit/index';
import AdminSet from 'containers/adminSet/index';
import Explain from 'containers/explain/index';
export function requireAuth() {
	const isAuthenticated = localStorage.getItem('user_info_authorization') ? true : false;
	return isAuthenticated;
}
const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			requireAuth() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
				/>
			)}
	/>
);
export const route_list = (
	<LayoutIndex>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route
                path="/home"
                title="首页"
				render={(props) => {
					return requireAuth() ? (
						<Home />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}}
			/>
			<Route
				path="/user"
				render={(props) => {
					return requireAuth() ? (
						<UserList />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}}
			/>
			<Route
				path="/shop"
				render={(props) => {
					return requireAuth() ? (
						<ShopList />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}}
			/>
			<Route
				path="/goods"
				render={(props) => {
					return requireAuth() ? (
						<GoodsList />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}}
			/>
			<Route
				path="/addGoods/:restaurant_id?"
				render={(props) => {
					if (props.match.params.restaurant_id) {
						return requireAuth() ? (
							<AddGoods {...props} />
						) : (
							<Redirect
								to={{
									pathname: '/login',
									state: { from: props.location }
								}}
							/>
						);
					} else {
						message.info('选择店铺');
						return requireAuth() ? (
							<Redirect to="/shop" />
						) : (
							<Redirect
								to={{
									pathname: '/login',
									state: { from: props.location }
								}}
							/>
						);
					}
				}}
			/>
			<Route
				path="/order"
				render={(props) => {
					return requireAuth() ? (
						<OrderList />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}}
			/>
			<Route
				path="/adminList"
				render={(props) => {
					return requireAuth() ? (
						<AdminList />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}}
			/>
			<Route
				path="/addShop"
				render={(props) => {
					return requireAuth() ? (
						<AddShop />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}}
			/>
			<Route
				path="/visitor"
				render={(props) => {
					return requireAuth() ? (
						<Visitor />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}}
			/>
			<Route
				path="/p-edit"
				render={(props) => {
					return requireAuth() ? (
						<Editor />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}}
			/>
			<Route
				path="/admin-set"
				render={(props) => {
					return requireAuth() ? (
						<AdminSet />
					) : (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				}}
			/>
			{/* <Route path="/explain" component={Explain} /> */}
			<PrivateRoute path="/explain" component={Explain} />

			{/* 路由从上向下匹配，匹配成功 break,匹配不到就执行最后一行ErrorPage页面 */}
			<Route component={ErrorPage} />
		</Switch>
	</LayoutIndex>
);
