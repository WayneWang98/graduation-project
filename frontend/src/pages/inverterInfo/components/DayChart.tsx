import React, { Component } from 'react'

import { DatePicker, Select } from 'antd'
import { connect } from 'react-redux'
import { actionCreators } from '../store'


import styles from '../style.module.less'

const { Option } = Select

interface PropsType {
  changeDate: (date: string) => void,
  changeField: (field: string) => void,
  changeChartData: () => void
}

class DayChart extends Component<PropsType> {
  onChange = async (date: any, dateString: any) => {
    if (date !== null) {
      await this.props.changeDate(dateString)
      this.props.changeChartData()
    }
  }

  handleSelectChange = async (value: any) => {
    await this.props.changeField(value)
    this.props.changeChartData()
  }

  render() {
    return (
      <div>
        <div className={styles['datePicker-container']}>
          <Select defaultValue="总有功功率" style={{ width: 120}} onChange={this.handleSelectChange}>
            <Option value="总有功功率">总有功功率</Option>
            <Option value="总发电量">总发电量</Option>
            <Option value="日发电量">日发电量</Option>
          </Select>
          <DatePicker onChange={this.onChange} inputReadOnly={true} className={styles['datePicker']}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { date, dateType, field, name, chartData} = state.inverterInfo
  return {
    date,
    dateType,
    field,
    name,
    chartData
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    changeDate (dates: string) {
      dispatch(actionCreators.changeDate(dates))
    },
    changeField(field: any) {
      dispatch(actionCreators.changeField(field))
    },
    changeChartData() { // 更新图表数据
      const {name, dateType, date, field} = this as any // 先这样子写
      dispatch(actionCreators.changeChartData({
        name: name.split('-')[1],
        date,
        type: dateType,
        field
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayChart)