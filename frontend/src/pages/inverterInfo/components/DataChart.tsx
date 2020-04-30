import React, { Component } from 'react'

import { Tabs } from 'antd'

import DayChart from './DayChart'
import MonthChart from './MonthChart'
import YearChart from './YearChart'

import styles from '../style.module.less'

const { TabPane } = Tabs

function callback(key: string) {
  console.log(key);
}

class DataChart extends Component {
  render() {
    return (
      <div className={styles['dataChart-container']}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="本日" key="1">
            <DayChart></DayChart>
          </TabPane>
          <TabPane tab="本月" key="2">
            <MonthChart></MonthChart>
          </TabPane>
          <TabPane tab="本年" key="3">
            <YearChart></YearChart>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default DataChart