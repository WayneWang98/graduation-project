import React, { Component } from 'react'

import DataPreview from './components/DataPreview'
import StationSelect from './components/StationSelect'
import DataChart from './components/DataChart'

import styles from './style.module.less'
class InverterInfo extends Component {
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
export default InverterInfo