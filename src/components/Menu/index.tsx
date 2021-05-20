import React, { useState, useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { Link, useLocation } from 'umi';
import logo from '@/assets/img/logo.png';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import './index.less';
import { menuRoutes } from '../../../config/route.config';
import IconFont from '@/components/IconFont'
import {useSelector, useDispatch}from 'dva'
import type {ConnectState} from '@/models/model'
const { SubMenu } = Menu;
const MenuView: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { config } = useSelector((state:ConnectState) => state)
  const dispatch = useDispatch()
  const selectMenu = (key:string, route:any) => {
    let currentMenuOpenItem = 'home'
    if(!route.routes) {
      currentMenuOpenItem = key
    }else {
      currentMenuOpenItem = route.key
    }
    dispatch({
      type: 'config/save',
      action: {
        currentRouteKey: key,
        currentMenuOpenItem
      }
    })
  }
  console.log('asdasdasd',props)
  const location = useLocation();
  const selectedKeys = menuRoutes.filter((ele) => ele.path == location.pathname)[0].key
  const defaultOpenKeys = 

  useEffect(() => {
    console.log('config', config.currentMenuOpenItem)
  }, [config])

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
        // defaultOpenKeys={['user']}
        defaultOpenKeys={[config.currentMenuOpenItem]}
        mode="inline"
        onClick={() => {}}
        selectedKeys={[selectedKeys]}
        theme={'light'}
        // theme={theme === 'default' ? 'light' : 'dark'}
      >
        {menuRoutes.map((ele: any, idx: any): JSX.Element => {
          let RootIcon = ele.icon
          // console.log('rootIcon', ele)
          if (ele.routes) {
            return (
              <SubMenu title={ele.name} icon={<RootIcon />} key={ele.key}>
                {ele.routes &&
                  ele.routes.map((child: any, cIdx: any) => {
                    let ChildIcon = child.icon
                    if(child.disappearMenu) {
                      return('')
                    }else {
                      return (
                        <Menu.Item title={child.name} key={child.key} onClick={() => {
                          selectMenu(child.key, ele)
                        }}>
                          <Link to={child.path}>{ChildIcon && <ChildIcon />}{child.name}</Link>
                        </Menu.Item>
                      )
                    }
                    
                  })}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item title={ele.name} key={ele.key} onClick={() => {
                selectMenu(ele.key, ele)
              }}>
                <Link to={ele.path}>{RootIcon && <RootIcon />}{ele.name}</Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Layout.Sider>
  );
};
export default MenuView;
