import React from 'react';
import { Route,Switch } from "react-router-dom";
import Layout from 'components/layout/index';
import ErrorPage from 'components/error/index';
import Home from 'containers/home/index';

export const route_list = (
    <Layout>
        <Switch>
            <Route exact path= '/' component={Home} />
            {/* 路由从上向下匹配，匹配成功 break,匹配不到就执行最后一行ErrorPage页面 */}
            <Route component={ErrorPage} />
        </Switch>
    </Layout>
  )