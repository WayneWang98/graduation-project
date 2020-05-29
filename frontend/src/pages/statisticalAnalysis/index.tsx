/* 统计分析 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators as leftSideActionCreators } from '../../common/leftSide/store'
import { actionCreators } from './store'
import { getFormatDate } from '../../common/utils'
import { Tabs, DatePicker } from 'antd';

import TreeSelect from './components/TreeSelect'
import PieChart from './components/PieChart'
import styles from './style.module.less'
import moment from 'moment'

interface PropsTypes {
  date: string,
  dateType: any,
  chartData: any,
  checkedLeaf: any,
  changeOpenMenu: () => void,
  changePageName: () => void,
  changeDateType: (dateType: string) => void,
  changeDate: (date: string) => void,
  changeChartData: (data: any) => void
}

const { TabPane } = Tabs

class StatisticalAnalysis extends Component<PropsTypes> {
  constructor(props: any) {
    super(props)
    this.props.changeOpenMenu()
    this.props.changePageName()
  }
  onDateChange = async (date: any, dateString: any) => {
    await this.props.changeDate(dateString)
    await this.props.changeChartData(this.props.checkedLeaf)
  }
  
  onTabChange = async (key: string) => {
    await this.props.changeDateType(key)
    const { dateType } = this.props
    await this.props.changeDate(getFormatDate(new Date(), dateType))
    await this.props.changeChartData(this.props.checkedLeaf)
  }

  render() {
    let { dateType } = this.props
    let date: any = this.props.date
    if (dateType === 'day') { // picker应该接受date、month、year三个值，所以需要先修改一下临时的dateType
      dateType = 'date'
    }
    date = moment(date)
    return (
      <div>
        <div className={styles['section-left']}>
          <TreeSelect></TreeSelect>
        </div>
        <div className={styles['section-right']}>
          <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            <TabPane tab="本日" key="day">
            </TabPane>
            <TabPane tab="本月" key="month">
            </TabPane>
            <TabPane tab="本年" key="year">
            </TabPane>
          </Tabs>
          <DatePicker onChange={this.onDateChange} picker={dateType} mode={dateType} inputReadOnly value={date}/>
          <div>
            <PieChart></PieChart>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { dateType, date, checkedLeaf} = state.statisticalAnalysis
  return {
    pageName: state.mainBreadCrumb.pageName,
    dateType,
    date,
    checkedLeaf
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changePageName() {
      const action = {
        type: 'change_page_name',
        pageName: ['负荷监控', '统计分析']
      }
      dispatch(action)
    },
    changeOpenMenu() {
      dispatch(leftSideActionCreators.changeOpenMenu(['sub2']))
    },
    changeDateType(dateType: string) {
      dispatch(actionCreators.changeDateType(dateType))
    },
    changeDate(date: string) {
      dispatch(actionCreators.changeDate(date))
    },
    changeChartData(data: any) {
      dispatch(actionCreators.changeChartData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(StatisticalAnalysis)