import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'dva';
import type { ConnectState } from '@/models/model';
import { menuRoutes } from '../../../config/route.config';
import BreadCrumb from '../Breadcrumb';
import './index.less';

const Header: React.FC = (props) => {
  const { config } = useSelector((state: ConnectState) => state);
  const dispatch = useDispatch();
  // 更换主题
  useEffect(() => {
    if (config.theme) {
      const script = document.createElement('script');
      script.id = 'themeJs';
      script.src =
        'https://lb-typroject.oss-cn-hangzhou.aliyuncs.com/public/ym/less.min.js';
      document.body.appendChild(script);
      setTimeout(() => {
        const themeStyle = document.getElementById('less:color');
        if (themeStyle)
          localStorage.setItem('themeStyle', themeStyle.innerText);
      }, 500);
    } else {
      const themeJs = document.getElementById('themeJs');
      const themeStyle = document.getElementById('less:color');
      if (themeJs) themeJs.remove();
      if (themeStyle) themeStyle.remove();
      localStorage.removeItem('themeStyle');
    }
  }, [config.theme]);

  const changeMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          dispatch({
            type: 'config/save',
            action: {
              theme: true,
            },
          });
        }}
      >
        <span>暗黑主题</span>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          dispatch({
            type: 'config/save',
            action: {
              theme: false,
            },
          });
        }}
      >
        <span>亮白主题</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className="mainHeader">
      <div className="left">
        <div
          className="toggleMenu"
          onClick={() => {
            dispatch({
              type: 'config/save',
              action: {
                collapsed: !config.collapsed,
              },
            });
          }}
        >
          {config.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <BreadCrumb></BreadCrumb>
      </div>

      <div className="right">
        <Dropdown overlay={changeMenu}>
          <div title="更换主题" className="webTheme" />
        </Dropdown>
        <Dropdown
          className="content"
          overlay={
            <Menu>
              <Menu.Item onClick={() => {}}>
                <span>退出登录</span>
              </Menu.Item>
            </Menu>
          }
        >
          <span>
            <span className="avart">测</span>
            <span>测试人员</span>
          </span>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};
export default Header;
