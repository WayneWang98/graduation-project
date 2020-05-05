import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from '../style.module.less'

interface PropsTypes {
  previewData: any
}

class DataPreview extends Component<PropsTypes> {
  // constructor(props: any) {
  //   super(props)
  // }

  render() {
    const { currentOutput, temperature, co2Reduction, equivalentTree, totalIncome } = this.props.previewData
    return (
      <div className={styles['picData-container']}>
        <div className={styles['picData-title']}>数据概览</div>
        <div className={styles['picData-groups']}>
          <div className={styles['picData-item']}>
            当前功率
            <div className={styles['data-detail']}>
              {currentOutput + 'w'}
            </div>
          </div>
          <div className={styles['picData-item']}>
            逆变器温度
            <div className={styles['data-detail']}>
              {temperature + '℃'}
            </div>
          </div>
          <div className={styles['picData-item']}>
            累计等效CO2减排量
            <div className={styles['data-detail']}>
              {co2Reduction + 't'}
            </div>
          </div>
          <div className={styles['picData-item']}>
            累计等效树木
            <div className={styles['data-detail']}>
              {equivalentTree + '棵'}
            </div>
          </div>
          <div className={styles['picData-item']}>
            总收入
            <div className={styles['data-detail']}>
              {totalIncome + '元'}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    previewData: state.inverterInfo.previewData
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPreview)