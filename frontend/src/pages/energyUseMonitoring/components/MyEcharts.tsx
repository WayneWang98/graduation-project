import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getChineseDate } from '../../../common/utils'
import ReactEcharts from 'echarts-for-react'

interface PropsTypes {
  date: string,
  chartData: any
}

class Echarts extends Component<PropsTypes> {

  // shouldComponentUpdate(nextProps: any) { // 防止日期类型改变，而date未改变所引起的重复渲染，只有当date改变时才重新渲染图表
  //   if (nextProps.date === this.props.date) {
  //     return false
  //   }
  //   return true
  // }

  getOption(): echarts.EChartOption {
    const { date, chartData } = this.props
    console.log(chartData.length)
    let timesArr: string[] = [], activePowerArr: string[] = [], apparentPowerArr: string[] = []
    if (chartData !== null) {
      chartData.forEach((item: any) => {
        timesArr.push(item.times)
        activePowerArr.push(item.activePower)
        apparentPowerArr.push(item.apparentPower)
      })
    }
    
    return {
      title: {
        text: getChineseDate(date) + ' 用能监测',
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
      legend: {
        data: ['有功功率（wh）','视在功率（VA）'],
        left: 20,
        bottom: 0
      },
      xAxis: {
        type: 'category',
        data: timesArr
      },
      yAxis: [{
        name: '有功功率（wh）',
        type: 'value'
      }],
      series: [{
        name: '有功功率（wh）',
        data: activePowerArr,
        type: 'bar',
        smooth: true,
        yAxisIndex: 0,
        markPoint: {
          data: [{
              type: 'max',
              name: 'max'
          }, {
              type: 'min',
              name: 'min'
          }]
        },
        itemStyle: {
          color: '#2F4554'
        }
      }, {
        name: '视在功率（VA）',
        data: apparentPowerArr,
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        markPoint: {
          data: [{
            type: 'max',
            name: 'max'
          }, {
            type: 'min',
            name: 'min'
          }]
        },
        itemStyle: {
          color: 'green'
        }
      }]
    }
  }
  render() {
    return (
      <ReactEcharts option={this.getOption()}/>
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

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Echarts)