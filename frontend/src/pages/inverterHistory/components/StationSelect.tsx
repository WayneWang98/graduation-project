import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'

import { TreeSelect } from 'antd'

interface PropsTypes {
  changeInverterName: (name: string) => void,
  inverterName: string
}

const { TreeNode } = TreeSelect

class StationSelect extends Component<PropsTypes> {

  onChange = (value: any) => {
    console.log(value)
    this.props.changeInverterName(value)
  }  

  render() {
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={this.props.inverterName}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择需要查看的设备"
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        <TreeNode value="parent 1" title="设备列表">
          <TreeNode value="parent 1-0" title="综合教学楼" selectable={false}>
            <TreeNode value="inverter1" title="综合教学楼" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="工科楼" selectable={false}>
            <TreeNode value="inverter2" title="工科一号楼"/>
            <TreeNode value="inverter3" title="工科二号楼"/>
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    )
  }

}

const mapStateToProps = (state: any) => {
  const { inverterName } = state.inverterHistory
  return {
    inverterName
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeInverterName(name: string) {
      dispatch(actionCreators.changeInverterName(name))
    },
    changeTableData(data: any) {
      dispatch(actionCreators.changeTableData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationSelect)