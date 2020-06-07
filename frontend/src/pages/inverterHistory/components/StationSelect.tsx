import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'

import { TreeSelect } from 'antd'

interface PropsTypes {
  changeInverterName: (name: string) => void,
  getTreeData: () => void,
  changeTableData: (data: any) => void,
  inverterName: string,
  treeData: any,
  pageNo: string,
  pageSize: string,
  inverterId: string
}

const { TreeNode } = TreeSelect

class StationSelect extends Component<PropsTypes> {

  constructor(props: any) {
    super(props)
    this.props.getTreeData()
  }

  onChange = async (value: any) => {
    await this.props.changeInverterName(value)
    const data =  {
      pageNo: this.props.pageNo, 
      pageSize: this.props.pageSize, 
      inverterId: this.props.inverterId
    } 
    this.props.changeTableData(data)
  }  

  render() {
    return (
      <TreeSelect
        style={{ width: '100%' }}
        value={this.props.inverterName}
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
  const { inverterName, treeData, pageNo, pageSize, inverterId } = state.inverterHistory
  return {
    inverterName,
    treeData,
    pageNo, 
    pageSize, 
    inverterId
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTreeData() {
      dispatch(actionCreators.changeTreeData())
    },
    changeInverterName(name: string) {
      dispatch(actionCreators.changeInverterName(name))
    },
    changeTableData(data: any) {
      dispatch(actionCreators.changeTableData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationSelect)