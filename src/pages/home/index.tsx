import React from 'react'
import {useSelector}from 'dva'
import type {ConnectState} from '@/models/model'
import { Statistic, Card, Row, Col } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import MyEcharts from '@/components/myEcharts'
import './index.less'
const { Countdown } = Statistic
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Moment is also OK
const HomePage: React.FC = (props) => {
  
  const {config} = useSelector((state:ConnectState) => state)

  console.log('dva',config)

  const getOption1 = () => {
    return {
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          smooth: true,
          showSymbol: false,
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          smooth: true,
          showSymbol: false,
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          smooth: true,
          showSymbol: false,
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          smooth: true,
          showSymbol: false,
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {},
          smooth: true,
          showSymbol: false,
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
  }
  const getOption2 = () => {
    return {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
          ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    }
  }

  return (
    <div className="HomePage">
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24} style={{ marginTop: 20 }}>
          <Card>
            <Countdown
              title="Day Level"
              value={deadline}
              format="D 天 H 时 m 分 s 秒"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12} style={{ marginTop: 20 }}>
          <Card>
            <MyEcharts
              option={getOption1()}
              style={{ width: '100%', height: '500px' }}
            />
          </Card>
        </Col>
        <Col span={12} style={{ marginTop: 20 }}>
          <Card>
            <MyEcharts
              option={getOption2()}
              style={{ width: '100%', height: '500px' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default HomePage