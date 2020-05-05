import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators as leftSideActionCreators } from '../../common/leftSide/store'
import StationSelect from './components/StationSelect'
import DataTable from './components/DataTable'

import styles from './style.module.less'

interface PropsTypes {
  changePageName: () => void,
  changeOpenMenu: () => void,
  pageName: string[]
}
interface StateTypes {
  pageName: string[]
}

class InverterHistory extends Component<PropsTypes, StateTypes> {
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
          <DataTable></DataTable>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changePageName() {
      const action = {
        type: 'change_page_name',
        pageName: ['历史数据', '光伏数据']
      }
      dispatch(action)
    },
    changeOpenMenu() {
      dispatch(leftSideActionCreators.changeOpenMenu(['sub4']))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InverterHistory)