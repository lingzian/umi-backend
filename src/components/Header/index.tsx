import React, { useState } from 'react';
import { Menu, Dropdown, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import {useSelector, useDispatch}from 'dva'
import type {ConnectState} from '@/models/model'
import './index.less';

const Header: React.FC = (props) => {
  const { config } = useSelector((state:ConnectState) => state)
  const dispatch = useDispatch()
  const changeMenu = (
    <Menu>
      <Menu.Item onClick={() => {
        dispatch({
          type: 'config/save',
          action: {
            theme: true
          }
        })
      }}>
        <span>暗黑主题</span>
      </Menu.Item>
      <Menu.Item onClick={() => {
        dispatch({
          type: 'config/save',
          action: {
            theme: false
          }
        })
      }}>
        <span>亮白主题</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className="mainHeader">
      <div
        className="toggleMenu"
        onClick={() => {
          dispatch({
            type: 'config/save',
            action: {
              collapsed: !config.collapsed
            }
          })
        }}
      >
        {config.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      {/* <Breadcrumb /> */}
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
