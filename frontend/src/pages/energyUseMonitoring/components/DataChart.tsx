import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'

import { Tabs, DatePicker } from 'antd'
import moment from 'moment'

import Echarts from './MyEcharts'
import { getFormatDate } from '../../../common/utils'
import styles from '../style.module.less'


interface PropsTypes {
  date: string,
  dateType: any,
  chartData: any,
  changeDateType: (dateType: string) => void,
  changeDate: (date: string) => void,
  changeChartData: () => void
}

const { TabPane } = Tabs

class DataChart extends Component<PropsTypes> {
  constructor(props: any) {
    super(props)
    this.props.changeChartData()
  }

  onDateChange = async (date: any, dateString: any) => {
    await this.props.changeDate(dateString)
    this.props.changeChartData()
  }
  
  onTabChange = async (key: string) => {
    await this.props.changeDateType(key)
    const { dateType } = this.props
    await this.props.changeDate(getFormatDate(new Date(), dateType))
    this.props.changeChartData()
  }

  

  render() {
    let { dateType } = this.props
    let date: any = this.props.date
    if (dateType === 'day') { // picker应该接受date、month、year三个值，所以需要先修改一下临时的dateType
      dateType = 'date'
    }
    date = moment(date)
    return (
      <div className={styles['dataChart-container']}>
        <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
          <TabPane tab="本日" key="day">
          </TabPane>
          <TabPane tab="本月" key="month">  
          </TabPane>
          <TabPane tab="本年" key="year">
          </TabPane>
        </Tabs>
        <div >
          <div className={styles['datePicker-container']}>
            <DatePicker onChange={this.onDateChange} picker={dateType} mode={dateType} inputReadOnly value={date}/> {/**单纯的修改picker，弹框不会变化，还需要修改mode*/}
          </div>
          <Echarts></Echarts>
        </div>
      </div>  
    )
  }
}

const mapStateToProps = (state: any) => {
  const { dateType, date, local, chartData } = state.energyUseMonitoring
  return {
    local,
    dateType,
    date,
    chartData
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeDateType(dateType: string) {
      dispatch(actionCreators.changeDateType(dateType))
    },
    changeDate(date: string) {
      dispatch(actionCreators.changeDate(date))
    },
    changeChartData() {
      const {local, dateType, date} = this as any // 先这样子写
      dispatch(actionCreators.changeChartData({
        local,
        date,
        type: dateType,
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataChart)