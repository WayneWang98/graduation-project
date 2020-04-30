import React, { Component } from 'react'

import PowerStationList from './components/PowerStationList'
import PowerStationMap from './components/PowerStationMap'

import styles from './style.module.less'

class PowerStationPreview extends Component {
  render() {
    return (
      <div>
        <div className={styles['section-left']}>
          <PowerStationList></PowerStationList>
        </div>
        <div className={styles['section-right']}>
          <PowerStationMap></PowerStationMap>
        </div>
      </div>
    )
  }
}

export default PowerStationPreview