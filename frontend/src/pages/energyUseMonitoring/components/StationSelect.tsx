import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'

import { TreeSelect } from 'antd'

interface PropsTypes {
  local: string,
  changeLocal: (local: string) => void
}

const { TreeNode } = TreeSelect

class StationSelect extends Component<PropsTypes> {

  onChange = (value: any) => {
    if (value !== undefined) {
      this.props.changeLocal(value)
    }
  }

  render() {
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={this.props.local}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择需要查看的设备"
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        <TreeNode value="parent 1" title="设备列表">
          <TreeNode value="parent 1-0" title="综合教学楼" selectable={false}>
            <TreeNode value="综合教学楼" title="综合教学楼" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="工科楼" selectable={false}>
            <TreeNode value="工科一号楼" title="工科一号楼"/>
            <TreeNode value="工科二号楼" title="工科二号楼"/>
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { local } = state.energyUseMonitoring
  return {
    local
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeLocal(local: any) {
      dispatch(actionCreators.changeLocal(local))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationSelect)