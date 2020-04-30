import React, { Component } from 'react'

import StationSelect from './components/StationSelect'
import DataTable from './components/DataTable'

import styles from './style.module.less'

class InverterHistory extends Component {
  render() {
    return (
      <div>
        <div className={styles['section-left']}>
          <StationSelect></StationSelect>
        </div>
        <div className={styles['section-right']}>
          <DataTable></DataTable>
        </div>
      </div>
    )
  }
}

export default InverterHistory