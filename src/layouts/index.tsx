import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import { Layout, BackTop } from 'antd';
import { withRouter } from 'umi';
import { useSelector, useDispatch, connect } from 'dva';
import type { ConnectState } from '@/models/model';
import '@/assets/css/public.less';
// import 'antd/dist/antd.css';
import './index.less';

const IndexPage: React.FC = (props) => {
  console.log('props', props);
  const { config } = useSelector((state: ConnectState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'config/init',
    });
  }, []);

  return (
    <Layout
      className="containerLayout"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Menu></Menu>
      <Layout
        className={
          config.collapsed ? 'contentLayout collapsed' : 'contentLayout'
        }
      >
        <Header></Header>
        <Layout.Content className="containerLayout-page">
          {props.children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
export default IndexPage;
