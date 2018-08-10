export const sidebarData = [{
		key: 'sub1',
		title: {
			icon: 'appstore',
			text: '首页',
		},
		children: [{
			key: '/home',
			text: '首页',
			to: {
				pathname: '/home',
				search: '?bread_one=首页',
				state: {
					defaultOpenKeys: '/home'
				}
			}
		}]
	},
	{
		key: 'sub2',
		title: {
			icon: 'file',
			text: '数据管理'
		},
		children: [{
				key: '/user',
				text: '用户列表',
				to: {
					pathname: '/user',
					search: '?bread_one=首页&bread_two=数据管理&bread_three=用户列表',
					state: {
						defaultOpenKeys: 'sub2'
					}
				},
			},
			{
				key: '/shop',
				text: '商家列表',
				to: {
					pathname: '/shop',
					search: '?bread_one=首页&bread_two=数据管理&bread_three=商家列表',
					state: {
						defaultOpenKeys: 'sub2'
					}
				},
			},
			{
				key: '/goods',
				text: '食品列表',
				to: {
					pathname: '/goods',
					search: '?bread_one=首页&bread_two=数据管理&bread_three=食品列表',
					state: {
						defaultOpenKeys: 'sub2'
					}
				},
			},
			{
				key: '/order',
				text: '订单列表',
				to: {
					pathname: '/order',
					search: '?bread_one=首页&bread_two=数据管理&bread_three=订单列表',
					state: {
						defaultOpenKeys: 'sub2'
					}
				},
			},
			{
				key: '/adminList',
				text: '管理员列表',
				to: {
					pathname: '/adminList',
					search: '?bread_one=首页&bread_two=数据管理&bread_three=管理员列表',
					state: {
						defaultOpenKeys: 'sub2'
					}
				},
			}
		]
	},
	{
		key: 'sub3',
		title: {
			icon: 'plus',
			text: '添加数据'
		},
		children: [{
				key: '/addShop',
				text: '添加商铺',
				to: {
					pathname: '/addShop',
					search: '?bread_one=首页&bread_two=添加数据&bread_three=添加商铺',
					state: {
						defaultOpenKeys: 'sub3'
					}
				}
			},
			{
				key: '/addGoods',
				text: '添加商品',
				to: {
					pathname: '/addGoods',
					search: '?bread_one=首页&bread_two=添加数据&bread_three=添加商品',
					state: {
						defaultOpenKeys: 'sub3'
					}
				}
			}
		]
	},
	{
		key: 'sub4',
		title: {
			icon: 'star-o',
			text: '图表'
		},
		children: [{
			key: '/visitor',
			text: '用户分布',
			to: {
				pathname: '/visitor',
				search: '?bread_one=首页&bread_two=图表&bread_three=用户分布',
				state: {
					defaultOpenKeys: 'sub4'
				}
			}
		}]
	},
	{
		key: 'sub5',
		title: {
			icon: 'form',
			text: '编辑'
		},
		children: [{
			key: '/p-edit',
			text: '文本编辑',
			to: {
				pathname: '/p-edit',
				search: '?bread_one=首页&bread_two=编辑&bread_three=文本编辑',
				state: {
					defaultOpenKeys: 'sub5'
				}
			}
		}]
	},
	{
		key: 'sub6',
		title: {
			icon: 'setting',
			text: '设置'
		},
		children: [{
			key: '/admin-set',
			text: '管理员设置',
			to: {
				pathname: '/admin-set',
				search: '?bread_one=首页&bread_two=设置&bread_three=管理员设置',
				state: {
					defaultOpenKeys: 'sub6'
				}
			}
		}]
	},
	{
		key: 'sub7',
		title: {
			icon: 'exclamation-circle',
			text: '说明'
		},
		children: [{
			key: '/explain',
			text: '说明',
			to: {
				pathname: '/explain',
				search: '?bread_one=首页&bread_two=说明&bread_three=说明',
				state: {
					defaultOpenKeys: 'sub7'
				}
			}
		}]
	},
	{
		key: 'sub8',
		title: {
			icon: 'exclamation-circle',
			text: '官网-demo'
		},
		children: [{
				key: '/search-product-demo',
				text: 'React的编程思想',
				to: {
					pathname: '/search-product-demo',
					search: '?bread_one=首页&bread_two=官网-React的编程思想demo&bread_three=demo',
					state: {
						defaultOpenKeys: 'sub8'
					}
				}
			},
			{
				key: '/react-context-demo',
				text: 'Context上下文',
				to: {
					pathname: '/react-context-demo',
					search: '?bread_one=首页&bread_two=官网-Context上下文&bread_three=demo',
					state: {
						defaultOpenKeys: 'sub8'
					}
				}
			},
			{
				key: '/react-refs-demo',
				text: 'refs',
				to: {
					pathname: '/react-refs-demo',
					search: '?bread_one=首页&bread_two=官网-refs&bread_three=demo',
					state: {
						defaultOpenKeys: 'sub8'
					}
				}
			},
			{
				key: '/react-fragments-demo',
				text: 'fragments',
				to: {
					pathname: '/react-fragments-demo',
					search: '?bread_one=首页&bread_two=官网-fragments&bread_three=demo',
					state: {
						defaultOpenKeys: 'sub8'
					}
				}
			},
			{
				key: '/higher-order-component',
				text: 'HOC(高阶组件)',
				to: {
					pathname: '/higher-order-component',
					search: '?bread_one=首页&bread_two=官网-higher-order-component&bread_three=demo',
					state: {
						defaultOpenKeys: 'sub8'
					}
				}
			},
			{
				key: '/portal-demo',
				text: 'portal(插槽)',
				to: {
					pathname: '/portal-demo',
					search: '?bread_one=首页&bread_two=官网-portal插槽&bread_three=demo',
					state: {
						defaultOpenKeys: 'sub8'
					}
				}
			},
			{
				key: '/render-props',
				text: 'render-props(渲染属性)',
				to: {
					pathname: '/render-props',
					search: '?bread_one=首页&bread_two=官网-render-props&bread_three=demo',
					state: {
						defaultOpenKeys: 'sub8'
					}
				}
			},
			{
				key: '/prop-types',
				text: 'prop-types(类型检查)',
				to: {
					pathname: '/prop-types',
					search: '?bread_one=首页&bread_two=官网-prop-types(类型检查)&bread_three=demo',
					state: {
						defaultOpenKeys: 'sub8'
					}
				}
			},
			{
				key: '/uncontrolled-components',
				text: 'uncontrolled-components(不受控组件)',
				to: {
					pathname: '/uncontrolled-components',
					search: '?bread_one=首页&bread_two=官网-uncontrolled-components(不受控组件)&bread_three=demo',
					state: {
						defaultOpenKeys: 'sub8'
					}
				}
			}
		]
	}

];

export const groupKey = sidebarData.map(item => item.key);