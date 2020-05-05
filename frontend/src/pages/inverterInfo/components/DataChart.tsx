import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'

import { Tabs } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { getChineseDate } from '../../../common/utils'

import DayChart from './DayChart'
import MonthChart from './MonthChart'
import YearChart from './YearChart'

import styles from '../style.module.less'

const { TabPane } = Tabs

interface PropsTypes {
  date: string,
  name: string,
  field: string,
  dateType: string,
  chartData: any,
  changeDateType: (type: string) => void,
  changeChartData: () => void
  // getChartData: (date: string, dateType: string, local: string) => void
}

// interface StateTypes {
//   getChartData: (date: string, dateType: string, local: string) => void
// }

class DataChart extends Component<PropsTypes> {

  constructor(props: any) {
    super(props)
    this.props.changeChartData()
  }

  getOption(): echarts.EChartOption {
    const { date, chartData } = this.props
    let timesArr: any = [], tansTemp1Arr: any = [], tansTemp2Arr: any = [], totalActivePowerArr: any = []
    chartData.forEach((item: any) => {
      timesArr.push(item.times)
      tansTemp1Arr.push(item.tansTemp1)
      tansTemp2Arr.push(item.tansTemp2)
      totalActivePowerArr.push(item.totalActivePower)
    });
    return {
      title: {
        text: getChineseDate(date) + ' 逆变器监测',
        left: 'center'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend : {
        data : ['发电量（wh）','模块一温度（℃）','模块二温度（℃）'],
        left : 10,
        bottom : 0
      },
      xAxis: {
        type: 'category',
        data: timesArr
      },
      yAxis: [
        {
          name : '发电量（wh）',
          type: 'value'
        },
        {
          name : '温度（℃）',
          type: 'value'
        }
      ],
      series: [{
        name : '发电量（wh）',
        data: totalActivePowerArr,
        type: 'bar',
        smooth: true,
        yAxisIndex : 0,
        markPoint : {
        data : [ {
          type : 'max',
          name : 'max'
        }, {
          type : 'min',
          name : 'min'
        } ]
        },
        itemStyle : {
            color : '#2F4554'
        }
      }, {
        name : '模块一温度（℃）',
        type: 'line',
        smooth: true,
        yAxisIndex : 1,//规定使用的坐标
        itemStyle : {
          color : '#C23531'
        },
        data: tansTemp1Arr
      }, {
        name : '模块二温度（℃）',
        type: 'line',
        smooth: true,
        yAxisIndex : 1,
        itemStyle : {
          color : '#008000'
        },
        data: tansTemp2Arr
      }]
    }
  }

  callback = async (key: string) => { // dispatch被connect包裹后有可能是异步的
    await this.props.changeDateType(key)
    this.props.changeChartData()
  }

  render() {
    return (
      <div className={styles['dataChart-container']}>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="本日" key="day">
            <DayChart></DayChart>
          </TabPane>
          <TabPane tab="本月" key="month">
            <MonthChart></MonthChart>
          </TabPane>
          <TabPane tab="本年" key="year">
            <YearChart></YearChart>
          </TabPane>
        </Tabs>
        <ReactEcharts option={this.getOption()}/>
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
    changeDateType(type: string) { // 点击tabs更改日期类型时执行
      dispatch(actionCreators.changeDateType(type))
    },
    changeChartData(data: any) { // 更新图表数据
      const {name, dateType, date, field} = this as any // 先这样子写
      dispatch(actionCreators.changeChartData({
        type: dateType,
        name,
        date,
        field
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataChart)