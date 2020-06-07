import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'

import { TreeSelect } from 'antd'

interface PropsTypes {
  local: string,
  treeData: any[],
  dateType: string,
  date: string,
  changeLocal: (local: string) => void,
  changeTreeData: () => void,
  changeChartData:(data: any) => void
}

class StationSelect extends Component<PropsTypes> {

  constructor(props: any) {
    super(props)
    this.props.changeTreeData()
  }

  onChange = async (value: any) => {
    if (value !== undefined) {
      await this.props.changeLocal(value)
      const { dateType, date, local } = this.props 
      this.props.changeChartData({type: dateType, date, local})
    }
  }

  render() {
    const  { treeData } = this.props
    const treeLen = treeData.length
    let local = ''
    if (treeLen) {
      for (let i = 0; i < treeLen; i ++) {
        if (treeData[i].children.length) {
          local = treeData[i].children[0].value
          break
        }
      }
    }
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={this.props.local || local}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择需要查看的设备"
        allowClear
        treeData={treeData}
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    )
  }
}

const mapStateToProps = (state: any) => {
  const { local, treeData, dateType, date } = state.energyUseMonitoring
  return {
    local,
    treeData,
    dateType,
    date
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeLocal(local: any) {
      dispatch(actionCreators.changeLocal(local))
    },
    changeTreeData() {
      dispatch(actionCreators.changeTreeData()) 
    },
    changeChartData(data: any) {
      dispatch(actionCreators.changeChartData(data)) 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationSelect)