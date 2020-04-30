import React, { Component } from 'react'

import { TreeSelect } from 'antd'

const { TreeNode } = TreeSelect

class StationSelect extends Component {
  state = {
    value: undefined,
  }

  onChange = (value: any) => {
    console.log(value)
    this.setState({ value })
  }  

  render() {
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择需要查看的设备"
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        <TreeNode value="parent 1" title="设备列表">
          <TreeNode value="parent 1-0" title="综合教学楼" selectable={false}>
            <TreeNode value="leaf1" title="综合教学楼" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="工科楼" selectable={false}>
            <TreeNode value="leaf2" title="工科一号楼"/>
            <TreeNode value="leaf3" title="工科二号楼"/>
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    )
  }

}

export default StationSelect