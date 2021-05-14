import React, { useState } from 'react';
import { Menu, Dropdown, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './index.less';

const Header: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const changeMenu = (
    <Menu>
      <Menu.Item onClick={() => {}}>
        <span>暗黑主题</span>
      </Menu.Item>
      <Menu.Item onClick={() => {}}>
        <span>亮白主题</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className="mainHeader">
      <div
        className="toggleMenu"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      {/* <Breadcrumb /> */}
      <Dropdown
        className="content fr"
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
      <Dropdown overlay={changeMenu}>
        <div title="更换主题" className="fr webTheme" />
      </Dropdown>
      <a
        className="fr"
        href="https://baidu.com"
        target="_blank"
        rel="noopener noreferrer"
        title="view github"
        style={{ marginRight: 20 }}
      >
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMTIgMTIgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMTIgMTIgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5YzAgOC40IDUuNSAxNS41IDEzIDE4YzEgMC4yIDEuMy0wLjQgMS4zLTAuOWMwLTAuNSAwLTEuNyAwLTMuMiBjLTUuMyAxLjEtNi40LTIuNi02LjQtMi42QzIwIDQxLjYgMTguOCA0MSAxOC44IDQxYy0xLjctMS4yIDAuMS0xLjEgMC4xLTEuMWMxLjkgMC4xIDIuOSAyIDIuOSAyYzEuNyAyLjkgNC41IDIuMSA1LjUgMS42IGMwLjItMS4yIDAuNy0yLjEgMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEgMC43LTMuNyAyLTUuMWMtMC4yLTAuNS0wLjgtMi40IDAuMi01YzAgMCAxLjYtMC41IDUuMiAyIGMxLjUtMC40IDMuMS0wLjcgNC44LTAuN2MxLjYgMCAzLjMgMC4yIDQuNyAwLjdjMy42LTIuNCA1LjItMiA1LjItMmMxIDIuNiAwLjQgNC42IDAuMiA1YzEuMiAxLjMgMiAzIDIgNS4xYzAgNy4zLTQuNSA4LjktOC43IDkuNCBjMC43IDAuNiAxLjMgMS43IDEuMyAzLjVjMCAyLjYgMCA0LjYgMCA1LjJjMCAwLjUgMC40IDEuMSAxLjMgMC45YzcuNS0yLjYgMTMtOS43IDEzLTE4LjFDNTEgMjEuOSA0Mi41IDEzLjQgMzIgMTMuNHoiLz48L3N2Zz4="
          alt="github"
          width="26"
        />
      </a>
    </Layout.Header>
  );
};
export default Header;
