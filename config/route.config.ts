
export const menuRoutes = [
  {
    path: '/',
    name: '首页',
    key: 'home',
    component: '@/pages/home',
    icon: 'UserOutlined'
  },
  {
    path: '/user',
    name: '用户管理',
    key: 'user',
    routes: [
      {
        path: '/user/list',
        name: '用户列表',
        exact: true,
        key: 'user:list:view',
        component: '@/pages/user/list'
      },
      {
        path: '/user/list/add',
        name: '新增用户',
        exact: true,
        key: 'user:list:add',
        component: '@/pages/user/edit'
      },
      {
        path: '/user/list/edit',
        name: '编辑用户',
        exact: true,
        key: 'user:list:edit',
        component: '@/pages/user/edit'
      }
    ]
  }
]
export default [
  {
    path: '/login', 
    exact: true,
    component: '@/pages/login',
    key: 'login'
  },
  { 
    path: '/', 
    component: '@/layouts',
    wrappers: [
      '@/components/Auth',
    ],
    name: 'layout',
    routes: menuRoutes
  },
]

