/* 电站列表组件 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import styles from '../style.module.less'

interface PropsTypes {
  stationList: any,
  history: any
}

interface StateTypes {

}

class PowerStationList extends Component<PropsTypes, StateTypes> {


  constructor(props: any) {
    super(props)
  }

  handleItemClick = (index: number) => {
    const { id } = this.props.stationList[index]
    localStorage.setItem('station_id', id)
    this.props.history.push('/inverter_info')
  }

  render() {
    const stationItems = this.props.stationList.map((item: any, index: number) => {
      return (
        <div key={item.id} 
          className={styles['staion-list-item']}
          onClick={() => {
            this.handleItemClick(index)
          }}
        >
          <img src={item.imgSrc} alt='test图片'/>
           <table className={styles['staion-info-table']}>
             <tbody>
              <tr>
                <td>电站名称：</td>
                <td>{item.name}</td>
              </tr>
              <tr>
                <td>电站规模：</td>
                <td>{item.scale + 'kW'}</td>
              </tr>
              <tr>
                <td>当前功率：</td>
                <td>{item.currentPower + 'kWh'}</td>
              </tr>
              <tr>
                <td>今日发电：</td>
                <td>{item.dailyOutput + 'kWh'}</td>
              </tr>
              <tr>
                <td>累计发电量：</td>
                <td>{item.totalOutput + 'kWh '}</td>
              </tr>
              <tr>
                <td>最后更新时间：</td>
                <td>{moment(item.updateTimes).format('YYYY-MM-DD hh:mm:ss')}</td>
              </tr>
             </tbody>
           </table>
        </div>
      )
    })
    return(
      <div className={styles['station-list']}>
        <div className={styles['staion-list-title']}>电站列表</div>
        <div className={styles['staion-list-container']}>
          {stationItems}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    stationList: state.powerStationPreview.stationList
  }
}
const mapDispatchToProps = () => {
  return {
    
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PowerStationList))