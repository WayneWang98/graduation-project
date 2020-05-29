import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tree } from 'antd'
import { actionCreators } from '../store'

interface PropsTypes {
  treeData: any,
  changeTreeData: () => void,
  changeCheckedLeaf: (data: any) => void,
  changeChartData: (data: any) => void
}

class TreeSelect extends Component<PropsTypes> {
  constructor(props: any) {
    super(props)
    this.props.changeTreeData()
  }

  onCheck =  async (checkedKeys: any, info: any) => {
    const checkedNodes = info.checkedNodes
    let checkedLeaf: any = []
    checkedNodes.forEach((item: any) => {
      if (item.isLeaf !== undefined && item.isLeaf === true) {
        checkedLeaf.push(item)
      }
    })
    await this.props.changeCheckedLeaf(checkedLeaf)
    await this.props.changeChartData(checkedLeaf)
  }

  render () {
    return (
      <Tree
        checkable
        onCheck={this.onCheck}
        treeData={this.props.treeData}
        autoExpandParent={true}
        defaultExpandAll={true}
      />
    )
  }
  
}

const mapStateToProps = (state: any) => {
  const { treeData } = state.statisticalAnalysis
  return {
    treeData
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeTreeData() {
      dispatch(actionCreators.changeTreeData())
    },
    changeCheckedLeaf(data: any) {
      dispatch(actionCreators.changeCheckedLeaf(data))
    },
    changeChartData(data: any) {
      dispatch(actionCreators.changeChartData(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TreeSelect)