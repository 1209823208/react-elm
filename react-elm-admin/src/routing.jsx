import React from 'react';
import { Route,Switch } from "react-router-dom";
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

export const route_list = (
    <LayoutIndex>
        <Switch>
            <Route exact path= '/' component={Home} />
            <Route path= '/home' component={Home} />
            <Route path= '/user' component={UserList} />
            <Route path= '/shop' component={ShopList} />
            <Route path= '/goods' component={GoodsList} />
            <Route path= '/addGoods/:restaurant_id' component={AddGoods} />
            <Route path= '/order' component={OrderList} />
            <Route path= '/adminList' component={AdminList} />
            <Route path= '/addShop' component={AddShop} />
            <Route path= '/visitor' component={Visitor} />
            <Route path= '/p-edit' component={Editor} />
            {/* 路由从上向下匹配，匹配成功 break,匹配不到就执行最后一行ErrorPage页面 */}
            <Route component={ErrorPage} />
        </Switch>
    </LayoutIndex>
  )