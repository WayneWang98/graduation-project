import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TreeSelect } from 'antd'
import { actionCreators } from '../store'

interface PropsTypes {
  treeData: any,
  name: any,
  dateType: string, 
  date: string,
  field: string, 
  getTreeData: () => void,
  changeTreeSelect: (name: string) => void,
  changePreviewData: (name: string) => void,
  changeChartData: (data: any) => void
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
    const { name, dateType, date, field } = this.props
    this.props.changeChartData({name, type: dateType, date, field})
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
  const { treeData, name, dateType, date, field } = state.inverterInfo
  return {
    treeData,
    name,
    dateType, 
    date, 
    field
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
    },
    changeChartData(data: any) {
      dispatch(actionCreators.changeChartData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StationSelect)