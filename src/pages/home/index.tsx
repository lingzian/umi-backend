import React from 'react'
import {useSelector}from 'dva'
import type {ConnectState} from '@/models/model'
import './index.less'

const HomePage: React.FC = (props) => {
  
  const {config} = useSelector((state:ConnectState) => state)

  console.log('dva',config)

  return (
    <div className="HomePage">
      首页
    </div>
  );
}
export default HomePage