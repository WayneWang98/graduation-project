/* 用能监测 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actionCreators as leftSideActionCreators } from '../../common/leftSide/store'

import styles from './style.module.less'

import StationSelect from './components/StationSelect'
import DataPreview from './components/DataPreview'
import DataChart from './components/DataChart'


interface PropsTypes {
  changePageName: () => void,
  changeOpenMenu: () => void,
  pageName: string[]
}
interface StateTypes {
  pageName: string[]
}

class EnergyUseMonitoring extends Component<PropsTypes, StateTypes> {
  constructor(props: any) {
    super(props)
    this.props.changePageName()
    this.props.changeOpenMenu()
  }

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

const mapStateToProps = (state: any) => {
  return {
    pageName: state.mainBreadCrumb.pageName
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changePageName() {
      const action = {
        type: 'change_page_name',
        pageName: ['负荷监控', '用能监测']
      }
      dispatch(action)
    },
    changeOpenMenu() {
      dispatch(leftSideActionCreators.changeOpenMenu(['sub2']))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(EnergyUseMonitoring)