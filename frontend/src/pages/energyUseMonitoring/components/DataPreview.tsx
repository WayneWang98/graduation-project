import React, { Component } from 'react'

import styles from '../style.module.less'

class DataPreview extends Component {
  render() {
    return (
      <div className={styles['picData-container']}>
        <div className={styles['picData-title']}>数据概览</div>
        <div className={styles['picData-groups']}>
          <div className={styles['picData-item']}>
            当前负荷
            <div className={styles['data-detail']}>
              0
            </div>
          </div>
          <div className={styles['picData-item']}>
            比上周同期
            <div className={styles['data-detail']}>
              0
            </div>
          </div>
          <div className={styles['picData-item']}>
            占全单位占比
            <div className={styles['data-detail']}>
              0
            </div>
          </div>
          <div className={styles['picData-item']}>
            月最大负荷
            <div className={styles['data-detail']}>
              0
            </div>
          </div>
          <div className={styles['picData-item']}>
            年最大负荷
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