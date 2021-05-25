import React, { FC } from 'react'
import ReactEcharts from 'echarts-for-react'
import { useSelector } from 'umi'
import type {ConnectState} from '@/models/model'
interface Props {
  option: object;
  style?: object;
  [key:string]: any;
}

const MyEcharts: FC<Props> = (props) => {
  const { config } = useSelector((state:ConnectState) => state)
  const themeColor = config.theme ? { theme: 'dark' } : {} 
  const options = {
    ...props.option,
    grid: {
      left: '8%',
      right: '8%',
      top: '6%',
      bottom: '8%'
    }
  }
  return <ReactEcharts option={options} {...themeColor} style={props.style} />
}

export default MyEcharts
