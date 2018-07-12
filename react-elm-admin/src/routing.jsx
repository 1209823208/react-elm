import React from 'react';
import { Route,Switch } from "react-router-dom";
import LayoutIndex from 'components/layout/index';
import ErrorPage from 'components/error/index';
import Home from 'containers/home/index';
import UserList from 'containers/userList/index';
import ShopList from 'containers/shopList/index';
import AddGoods from 'containers/addGoods/index';

export const route_list = (
    <LayoutIndex>
        <Switch>
            <Route exact path= '/' component={Home} />
            <Route path= '/home' component={Home} />
            <Route path= '/user' component={UserList} />
            <Route path= '/shop' component={ShopList} />
            <Route path= '/addGoods/:restaurant_id' component={AddGoods} />
            {/* 路由从上向下匹配，匹配成功 break,匹配不到就执行最后一行ErrorPage页面 */}
            <Route component={ErrorPage} />
        </Switch>
    </LayoutIndex>
  )