import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'umi';
import logo from '@/assets/img/logo.png';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import './index.less';
import { menuRoutes } from '../../../config/route.config';
const { SubMenu } = Menu;
const MenuView: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  console.log('menuRoutes', menuRoutes);

  return (
    <Layout.Sider
      collapsed={collapsed}
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
          {!collapsed && <h1>Antd多页签模板</h1>}
        </Link>
      </div>
      <Menu
        defaultOpenKeys={['home']}
        mode="inline"
        onClick={() => {}}
        // selectedKeys={[current]}
        theme={'light'}
        // theme={theme === 'default' ? 'light' : 'dark'}
      >
        {menuRoutes.map((ele: any, idx: any) => {
          if (ele.routes) {
            return (
              <SubMenu title={ele.name} key={ele.key}>
                {ele.routes &&
                  ele.routes.map((child: any, cIdx: any) => (
                    <Menu.Item title={child.name} key={child.key}>
                      <Link to={child.path}>{child.name}</Link>
                    </Menu.Item>
                  ))}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item title={ele.name} key={ele.key}>
                <Link to={ele.path}>{ele.name}</Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Layout.Sider>
  );
};
export default MenuView;
