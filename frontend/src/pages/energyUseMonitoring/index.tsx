/* 用能监测 */

import React, { Component } from 'react'

import styles from './style.module.less'

import StationSelect from './components/StationSelect'
import DataPreview from './components/DataPreview'
import DataChart from './components/DataChart'

class EnergyUseMonitoring extends Component {
 

  render() {
    return (
      <div>
        <div className={styles['section-left']}>
          <StationSelect></StationSelect>
        </div>
        <div className={styles['section-right']}>
          <DataPreview></DataPreview>
          <DataChart></DataChart> 
        </div>
      </div>
    )
  }
}

export default EnergyUseMonitoring