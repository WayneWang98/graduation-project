import React, { Component } from 'react'

import ToolBar from './components/ToolBar'
import EquipmentTable from './components/EquipmentTable'
import styles from './style.module.less'

class EquipmentManagement extends Component {
  render() {
    return (
      <div className={styles['section']}>
        <ToolBar></ToolBar>
        <EquipmentTable></EquipmentTable>
      </div>
    )
  }
}

export default EquipmentManagement