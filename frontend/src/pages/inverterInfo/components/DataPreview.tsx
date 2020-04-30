import React, { Component } from 'react'

import styles from '../style.module.less'

class DataPreview extends Component {
  render() {
    return (
      <div className={styles['picData-container']}>
        <div className={styles['picData-title']}>数据概览</div>
        <div className={styles['picData-groups']}>
          <div className={styles['picData-item']}>
            当前功率
            <div className={styles['data-detail']}>
              0
            </div>
          </div>
          <div className={styles['picData-item']}>
            逆变器温度
            <div className={styles['data-detail']}>
              0
            </div>
          </div>
          <div className={styles['picData-item']}>
            累计等效CO2减排量
            <div className={styles['data-detail']}>
              0
            </div>
          </div>
          <div className={styles['picData-item']}>
            累计等效树木
            <div className={styles['data-detail']}>
              0
            </div>
          </div>
          <div className={styles['picData-item']}>
            总收入
            <div className={styles['data-detail']}>
              0
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DataPreview