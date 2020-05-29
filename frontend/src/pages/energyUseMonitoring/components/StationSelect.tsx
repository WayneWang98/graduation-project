import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'

import { TreeSelect } from 'antd'

interface PropsTypes {
  local: string,
  treeData: any[],
  changeLocal: (local: string) => void,
  changeTreeData: () => void
}

class StationSelect extends Component<PropsTypes> {

  constructor(props: any) {
    super(props)
    this.props.changeTreeData()
  }

  onChange = (value: any) => {
    if (value !== undefined) {
      this.props.changeLocal(value)
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
        value={local}
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
  const { local, treeData } = state.energyUseMonitoring
  return {
    local,
    treeData
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeLocal(local: any) {
      dispatch(actionCreators.changeLocal(local))
    },
    changeTreeData() {
      dispatch(actionCreators.changeTreeData()) 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationSelect)