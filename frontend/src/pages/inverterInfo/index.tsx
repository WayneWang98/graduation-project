import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators as leftSideActionCreators } from '../../common/leftSide/store'

import DataPreview from './components/DataPreview'
import StationSelect from './components/StationSelect'
import DataChart from './components/DataChart'

import styles from './style.module.less'

interface PropsType {
  changeOpenMenu: () => void
  changePageName: () => void
}

class InverterInfo extends Component<PropsType> {
  constructor(props: any) {
    super(props)
    this.props.changeOpenMenu()
    this.props.changePageName()
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
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeOpenMenu() { // 刷新页面时修改左侧菜单的展开项
      dispatch(leftSideActionCreators.changeOpenMenu(['sub1']))
    },
    changePageName() { // 刷新页面时修改面包屑的名称
      const action = {
        type: 'change_page_name',
        pageName: ['光伏发电', '逆变器信息']
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InverterInfo)