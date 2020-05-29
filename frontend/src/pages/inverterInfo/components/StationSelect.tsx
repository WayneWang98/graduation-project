import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TreeSelect } from 'antd'
import { actionCreators } from '../store'

interface PropsTypes {
  treeData: any,
  name: any,
  getTreeData: () => void,
  changeTreeSelect: (name: string) => void,
  changePreviewData: (name: string) => void
}

class StationSelect extends Component<PropsTypes> {
  state = {
    value: undefined
  }

  constructor(props: any) {
    super(props)
    this.props.getTreeData()
    this.props.changePreviewData(this.props.name)
  }

  onChange = async (value: any) => { // 电站的选择被改变时，重新渲染右侧的数据
    await this.props.changeTreeSelect(value)
    this.props.changePreviewData(this.props.name)
  }

  render() {
    return (
      <TreeSelect
        style={{ width: '100%' }}
        value={this.props.name}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={this.props.treeData}
        placeholder="请选择逆变器"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    )
  }
}

const mapStateToProps = (state: any) => {
  const { treeData, name } = state.inverterInfo
  return {
    treeData,
    name
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTreeData() {
      dispatch(actionCreators.changeTreeData())
    },
    changeTreeSelect(name: string) {
      dispatch(actionCreators.changeTreeSelect(name))
    },
    changePreviewData(name: string) {
      dispatch(actionCreators.changePreviewData(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationSelect)