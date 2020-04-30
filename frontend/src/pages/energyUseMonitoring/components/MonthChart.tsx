import React, { Component } from 'react'

import { DatePicker } from 'antd'
import ReactEcharts from 'echarts-for-react'

import styles from '../style.module.less'
function onChange(date: any, dateString: any){
  console.log(date, dateString);
}

class MonthChart extends Component {
  getOption(): echarts.EChartOption {
    return {
      title: {
        text: '123141241214'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
    }
  }

  render() {
    return (
      <div>
        <div className={styles['datePicker-container']}>
          <DatePicker onChange={onChange} />
        </div>
        <ReactEcharts option={this.getOption()}/>
      </div>
    )
  }
}

export default MonthChart