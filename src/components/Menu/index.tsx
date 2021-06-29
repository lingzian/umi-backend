import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { Link, useLocation, useHistory, useRouteMatch } from 'umi';
import logo from '@/assets/img/logo.png';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import './index.less';
import { menuRoutes } from '../../../config/route.config';
import IconFont from '@/components/IconFont';
import { useSelector, useDispatch } from 'dva';
import type { ConnectState } from '@/models/model';
const { SubMenu } = Menu;
const MenuView: React.FC = (props) => {
  const { config } = useSelector((state: ConnectState) => state);

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  console.log('props.routes', location);

  const filterRoute = (menuRoutes: Array<any>) => {
    for (const ele of menuRoutes) {
      if (ele.path == location.pathname) {
        return {
          ...ele,
          parent: [ele.key],
        };
      }
      if (ele.routes) {
        const target: any = filterRoute(ele.routes);
        if (target) {
          return {
            ...target,
            parent: [ele.key],
          };
        }
      }
    }
  };

  // 找出当前路由的对象
  const menuOperateKey = filterRoute(menuRoutes);

  return (
    <Layout.Sider
      collapsed={config.collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        userSelect: 'none',
      }}
      width={220}
    >
      <div className="logo">
        <Link to={{ pathname: '/' }}>
          <img alt="logo" src={logo} />
          {!config.collapsed && <h1>Antd多页签模板</h1>}
        </Link>
      </div>
      <Menu
        defaultOpenKeys={menuOperateKey.parent} // 打开的Menu
        mode="inline"
        onClick={() => {}}
        selectedKeys={[menuOperateKey.key]} // 打开的SubMenu
        theme={config.theme ? 'dark' : 'light'}
      >
        {menuRoutes.map((ele: any, idx: any): JSX.Element => {
          let RootIcon = ele.icon;
          if (ele.routes) {
            return (
              <SubMenu title={ele.name} icon={<RootIcon />} key={ele.key}>
                {ele.routes.map((child: any, cIdx: any) => {
                  let ChildIcon = child.icon;
                  if (child.redirect) {
                    return '';
                  } else {
                    console.log('12312313123');
                    return (
                      <Menu.Item title={child.name} key={child.key}>
                        <Link to={child.path}>
                          {ChildIcon && <ChildIcon />}
                          {child.name}
                        </Link>
                      </Menu.Item>
                    );
                  }
                })}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item title={ele.name} key={ele.key}>
                <Link to={ele.path}>
                  {RootIcon && <RootIcon />}
                  <span>{ele.name}</span>{' '}
                </Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Layout.Sider>
  );
};
export default MenuView;
