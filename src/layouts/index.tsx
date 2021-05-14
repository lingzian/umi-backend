import React from 'react'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import { withRouter } from 'umi';
import '@/assets/css/public.less'
import './index.less';


const IndexPage: React.FC = (props) => {
  return (
    <div className="backendLayout">
      <Menu></Menu>
      <Header></Header>
      {props.children}
    </div>
  );
}
export default withRouter(IndexPage)