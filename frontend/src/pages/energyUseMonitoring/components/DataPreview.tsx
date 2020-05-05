import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from '../style.module.less'

interface PropsTypes {
  previewData: any
}

class DataPreview extends Component<PropsTypes> {
  render() {
    
    const { currentLoad, ratio, percentage, maxMouthLoad, maxYearLoad} = this.props.previewData
    return (
      <div className={styles['picData-container']}>
        <div className={styles['picData-title']}>数据概览</div>
        <div className={styles['picData-groups']}>
          <div className={styles['picData-item']}>
            当前负荷
            <div className={styles['data-detail']}>
              {currentLoad + 'Wh'}
            </div>
          </div>
          <div className={styles['picData-item']}>
            比上周同期
            <div className={styles['data-detail']}>
              {ratio + '%'}
            </div>
          </div>
          <div className={styles['picData-item']}>
            占全单位占比
            <div className={styles['data-detail']}>
              {percentage + '%'}
            </div>
          </div>
          <div className={styles['picData-item']}>
            月最大负荷
            <div className={styles['data-detail']}>
              {maxMouthLoad + 'Wh'}
            </div>
          </div>
          <div className={styles['picData-item']}>
            年最大负荷
            <div className={styles['data-detail']}>
              {maxYearLoad + 'Wh'}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { previewData } = state.energyUseMonitoring
  return {
    previewData
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPreview)