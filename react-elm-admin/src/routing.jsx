import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { message } from 'antd';


const Loading = () => <div>Loading...</div>;

const LayoutIndex = Loadable({
	loader: () => import('components/layout/index'),
	loading: Loading,
});
const ErrorPage = Loadable({
	loader: () => import('components/error/index'),
	loading: Loading,
});
const Home = Loadable({
	loader: () => import('containers/home/index'),
	loading: Loading,
});
const UserList = Loadable({
	loader: () => import('containers/userList/index'),
	loading: Loading,
});
const ShopList = Loadable({
	loader: () => import('containers/shopList/index'),
	loading: Loading,
});
const AddGoods = Loadable({
	loader: () => import('containers/goodsList/add'),
	loading: Loading,
});
const GoodsList = Loadable({
	loader: () => import('containers/goodsList/index'),
	loading: Loading,
});
const OrderList = Loadable({
	loader: () => import('containers/orderList/index'),
	loading: Loading,
});
const AdminList = Loadable({
	loader: () => import('containers/adminList/index'),
	loading: Loading,
});
const AddShop = Loadable({
	loader: () => import('containers/shopList/add'),
	loading: Loading,
});
const Visitor = Loadable({
	loader: () => import('containers/charts/index'),
	loading: Loading,
});
const Editor = Loadable({
	loader: () => import('containers/PEdit/index'),
	loading: Loading,
});
const AdminSet = Loadable({
	loader: () => import('containers/adminSet/index'),
	loading: Loading,
});

const Explain = Loadable({
	loader: () => import('containers/explain/index'),
	loading: Loading,
});
const SearchProductDemo = Loadable({
	loader: () => import('containers/demo/searchProductDemo/index'),
	loading: Loading,
});
const ReactContextDemo = Loadable({
	loader: () => import('containers/demo/react-context'),
	loading: Loading,
});
const ReactRefsDemo = Loadable({
	loader: () => import('containers/demo/react-refs'),
	loading: Loading,
});
const ReactFragmentsDemo = Loadable({
	loader: () => import('containers/demo/react-fragments'),
	loading: Loading,
});

const HigherOrderComponent = Loadable({
	loader: () => import('containers/demo/higher-order-components'),
	loading: Loading,
});
const ReactPortalsDemo = Loadable({
	loader: () => import('containers/demo/react-portals/index'),
	loading: Loading,
});
const RenderProps = Loadable({
	loader: () => import('containers/demo/render-props'),
	loading: Loading,
});

const PropTypesDemo = Loadable({
	loader: () => import('containers/demo/prop-types'),
	loading: Loading,
});
const UncontrolledComponent = Loadable({
	loader: () => import('containers/demo/uncontrolled-components'),
	loading: Loading,
});

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
			{/* 两种登陆验证 */}
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

			<PrivateRoute path="/search-product-demo" component={SearchProductDemo} />
			<Route path="/react-context-demo" component={ReactContextDemo} />
			<Route path="/react-refs-demo" component={ReactRefsDemo} />
			<Route path="/react-fragments-demo" component={ReactFragmentsDemo} />
			<Route path="/higher-order-component" component={HigherOrderComponent} />
			<Route path="/portal-demo" component={ReactPortalsDemo} />
			<Route path="/render-props" component={RenderProps} />
			<Route path="/prop-types" component={PropTypesDemo} />
			<Route path="/uncontrolled-components" component={UncontrolledComponent} />

			{/* 路由从上向下匹配，匹配成功 break,匹配不到就执行最后一行ErrorPage页面 */}
			<Route component={ErrorPage} />
		</Switch>
	</LayoutIndex>
);
