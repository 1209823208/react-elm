
## 前言
```
  该项目是基于https://github.com/bailicangdu/vue2-manage作者，把vue + element-ui 的后台管理系统改版为react16.4+antd。项目中的模块划分和API全来自于其中。只是把框架和UI换了。
```
## 说明
```
如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^_^
或者您可以 "follow" 一下
如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍
```
## 项目运行
```
  npm install
  npm start
```
## 自定义配置
```
  npm run eject
```
## 技术栈
```
  react16.4+react-router-dom4+axios+react-loadable懒加载+antd
```
##  第三方插件
```
  1、UI框架
    [antd](https://ant.design/docs/react/introduce-cn)
  2、布局 bootstrap
  3、图标 font-awesome
  4、react-quill
  5、prop-types
```
# 功能列表

- [x] 登陆/注销
- [x] 首页
  ```
    echarts图标
    componentDidUpdate生命周期-父子之间传递异步
  ```
- [x] 商家列表
 ```
    Object.assign合并两个对象
    componentWillReceiveProps生命周期-父子之间传递异步
  ```
- [x] 食品列表
  ```
    清楚input value
  ``` 
- [x] 订单列表
- [x] 管理员列表
- [x] 添加商铺
- [x] 添加商品
- [x] 用户分布
- [x] 文本编辑
  ```
   react-quill插件
  ```
- [x] react官网demo
  ```
   React的编程思想
   Context上下文
   refs
   fragments
   HOC(高阶组件)
   portal(插槽)
   render-props(渲染属性)
   prop-types(类型检查)
   uncontrolled-components(不受控组件)
  ```
## 项目布局
 ```
  ├── config                                      // 配置说明
  |   |
  |   |---webpack.config.dev                      //其中alias配置components、service、images路径
  ├── src                                         // 源码目录
  │   ├── components                              
  │   │   │── error                               // 错误组件
  │   │   │── nav-footer                          // 底部组件
  │   │   │── nav-side                            // 左侧导航栏
  │   │   │── tendency                            // echarts图标
      |── containers                              
  │   │   │── adminList                           // 管理员列表
  │   │   │── adminSet                            // 设置
  │   │   │── charts                              // 图标
  │   │   │── demo                                // react 官网demo
  │   │   │── explain                             // 说明
  │   │   │── goodsList                           // 商品列表
  │   │   │── home                                // 首页
  │   │   │── login                               // 登录
  │   │   │── orderList                           // 订单列表
  │   │   │── PEdit                               // 编辑
  │   │   │── shopList                            // 说明
  │   │   │── goodsList                           // 食品列表
  │   │   │── userList                            // 用户列表
      |── service                              
  │   │   │── axios-service                       // axios-service封装
  │   │   │── goods-service                       // 商品API
  │   │   │── order-service                       // 订单API
  │   │   │── shop-service                        // 店铺API
  │   │   │── user-service                        // 用户API
      |── environments                              
  │   │   │── environments                        // 服务器接口配置
 ```
## 部分截图
<img src="https://github.com/1209823208/react-elm/tree/master/react-elm-admin/src/images/manage-home.png"/>