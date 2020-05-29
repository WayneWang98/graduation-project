import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import styles from '../style.module.less'
import { getChineseDate } from '../../../common/utils'

interface PropsTypes {
  dateType: string,
  date: string,
  chartData: any
}
class PieChart extends Component<PropsTypes> {
  getOption(): echarts.EChartOption {

    return {
      title : {
        text:  getChineseDate(this.props.date) + ' 能耗对比',
        left: 'center',
        textStyle:{
          fontSize:15
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
   
    series: [
      {
        data: this.props.chartData,
        type: 'pie',
        // radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'outside',
            formatter:"{b}"
          }
        }
      }
    ]
    }
  }
  
  render() {
    return (
      <div className={styles['pieChart-container']}>
        <ReactEcharts option={this.getOption()}/>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { dateType, date, chartData} = state.statisticalAnalysis
  return {
    dateType,
    date,
    chartData
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChart)