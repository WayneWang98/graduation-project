/* 电站列表组件 */

import React, { Component } from 'react'

import styles from '../style.module.less'

class PowerStationList extends Component {
  state = {
    stationList: [{
      id: 1,
      name: '电站1',
      imgSrc: 'http://localhost:8099/file/cslg.jpg',
      scale: 10,
      currentPower: 200,
      dailyOutput: 11,
      totalOutput: 23,
      times: (new Date()).toLocaleString()
    }, {
      id: 2,
      name: '电站2',
      imgSrc: 'http://localhost:8099/file/cslg.jpg',
      scale: 100,
      currentPower: 300,
      dailyOutput: 11,
      totalOutput: 23,
      times: (new Date()).toLocaleString()
    }, {
      id: 3,
      name: '电站3',
      imgSrc: 'http://localhost:8099/file/cslg.jpg',
      scale: 20,
      currentPower: 113,
      dailyOutput: 11,
      totalOutput: 23,
      times: (new Date()).toLocaleString()
    }]
  }

  render() {
    const stationItems = this.state.stationList.map((item, index) => {
      return (
        <div key={item.id} className={styles['staion-list-item']}>
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
                <td>{item.times}</td>
              </tr>
             </tbody>
           </table>
        </div>
      )
    })
    return(
      <div className={styles['station-list']}>
        <div className={styles['staion-list-title']}>电站列表</div>
        {stationItems}
      </div>
    )
  }
}

export default PowerStationList