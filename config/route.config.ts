import {
  HomeOutlined,
  BankOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  AuditOutlined
} from '@ant-design/icons'
export const menuRoutes = [
  {
    path: '/',
    name: '首页',
    key: 'home',
    component: '@/pages/home',
    icon: HomeOutlined,
    subMenu: ['home'],
  },
  {
    path: '/user',
    name: '用户管理',
    key: 'user',
    icon:  UserOutlined,
    redirect: '/user/list',
    subMenu: ['user'],
    routes: [
      {
        path: '/user/list',
        name: '用户列表',
        exact: true,
        key: 'user:list:view',
        component: '@/pages/user/list',
        subMenu: ['user']
      },
      {
        path: '/user/list/add',
        name: '新增用户',
        exact: true,
        key: 'user:list:add',
        disappearMenu: true,
        component: '@/pages/user/edit',
        subMenu: ['user']
      },
      {
        path: '/user/list/edit',
        name: '编辑用户',
        exact: true,
        key: 'user:list:edit',
        disappearMenu: true,
        component: '@/pages/user/edit',
        subMenu: ['user']
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

