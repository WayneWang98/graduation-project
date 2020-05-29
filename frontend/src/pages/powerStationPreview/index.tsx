import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators as leftSideActionCreators } from '../../common/leftSide/store'
import { actionCreators } from './store'

import PowerStationList from './components/PowerStationList'
import PowerStationMap from './components/PowerStationMap'

import styles from './style.module.less'


interface PropsTypes{
  changePageName: () => void,
  changeOpenMenu: () => void,
  getStationList: () => void
}

class PowerStationPreview extends Component<PropsTypes> {
  constructor(props: any) {
    super(props)
    this.props.changeOpenMenu()
    this.props.changePageName()
    this.props.getStationList()
  }

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

const mapStateToProps = (state: any) => {
  return {

  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changePageName() {
      const action = {
        type: 'change_page_name',
        pageName: ['光伏监控', '电站预览']
      }
      dispatch(action)
    },
    changeOpenMenu() {
      dispatch(leftSideActionCreators.changeOpenMenu(['sub1']))
    },
    getStationList() {
      dispatch(actionCreators.getStationList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerStationPreview)