import {
  HomeOutlined,
  BankOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  AuditOutlined,
} from '@ant-design/icons';

export const menuRoutes = [
  {
    path: '/',
    name: '首页',
    key: '/home',
    component: '@/pages/home',
    icon: HomeOutlined,
  },
  {
    path: '/user',
    name: '用户管理',
    key: '/user',
    icon: UserOutlined,
    routes: [
      {
        path: '/user',
        redirect: '/user/list',
      },
      {
        path: '/user/list',
        name: '用户列表',
        exact: true,
        key: '/user/list',
        component: '@/pages/user/list',
      },
    ],
  },
];
export default [
  {
    path: '/login',
    exact: true,
    component: '@/pages/login',
    key: 'login',
  },
  {
    path: '/',
    component: '@/layouts',
    wrappers: ['@/components/Auth'],
    name: 'layout',
    routes: menuRoutes,
  },
];
