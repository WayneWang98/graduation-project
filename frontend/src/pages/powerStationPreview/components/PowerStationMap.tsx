import React, { Component } from 'react'
import { Map } from 'react-amap'

import styles from '../style.module.less'

class PowerStationMap extends Component {
  state = {
    amapkey: '2be5a53e8150bc5c58cc0db2352dbd64',
    version: '1.4.0'
  }
  

  render() {
    return (
      <div className={styles['map-container']}>
        <Map amapkey={this.state.amapkey} version={this.state.version} />
      </div>
    )
  }
}

export default PowerStationMap