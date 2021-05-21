import React, {useEffect} from 'react'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import { Layout, BackTop } from 'antd'
import { withRouter } from 'umi';
import {useSelector, useDispatch}from 'dva'
import type {ConnectState} from '@/models/model'
import '@/assets/css/public.less'
import './index.less';


const IndexPage: React.FC = (props) => {
  const { config } = useSelector((state:ConnectState) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'config/init'
    })
  }, [])

  return (
    <Layout className="containerLayout" onContextMenu={(e) => e.preventDefault()}>
      <Menu></Menu>
      <Layout
        className={config.collapsed ? 'contentLayout collapsed' : 'contentLayout'}
      >
        <Header></Header>
        <Layout.Content>
          {props.children}
        </Layout.Content>
      </Layout>
      
      
    </Layout>
  );
}
export default withRouter(IndexPage)