import React, { Component } from 'react'

import { Table, Button } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
import { downloadByBinary } from '../../../common/utils'
import { actionCreators } from '../store'

const { Column, ColumnGroup } = Table
let data: any = []

interface PropsTypes {
  pageNo: string,
  pageSize: string,
  totalSize: string,
  inverterId: string,
  tableData: any,
  changeTableData: (data: any) => void
}

class DataTable extends Component<PropsTypes> {
  constructor(props: any) {
    super(props)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleTableData = this.handleTableData.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    const { pageNo, pageSize, inverterId } = this.props
    this.props.changeTableData({pageNo, pageSize, inverterId})
  }

  handleButtonClick() {
    axios.post('http://localhost:7001/inverter/download', {}, {responseType: 'blob'}).then((res: any) => {
      downloadByBinary(res.data, '逆变器历史数据.xlsx')
    })
  }

  handlePageChange(page: number, pageSize: number | undefined) {
    this.props.changeTableData({
      pageNo: page, 
      pageSize, 
      inverterId: this.props.inverterId
    })
  }

  handleTableData(data: any) { // 对获取到的表格数据进行加工
    if (data.length) {
      data = data.map((item: any) => {
        item.times = new Date(item.times).toLocaleString()
        return item
      })
    }
  }

  render() {
    const { tableData, totalSize } = this.props
    this.handleTableData(tableData)
    return (
      <div>
        <Button type="primary" onClick={this.handleButtonClick}>下载报表</Button>
        <Table dataSource={tableData} bordered={true}
          scroll={{ x: 1500, y: 400 }}   
          pagination={{
            total: parseInt(totalSize),
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20'],
            showQuickJumper: true,
            onChange: this.handlePageChange
          }}
          rowKey={'id'}
        >
          <Column title="最后更新时间" dataIndex="times" width="150px" fixed={"left"}/>
          <Column title="日发电量（Wh）" dataIndex="dailyOutput" />
          <Column title="总发电量（Wh）" dataIndex="totalOutput" />
          <ColumnGroup title="三相电流">
            <Column title="A相电流（A）" dataIndex="aPhaseCurrent" />
            <Column title="B相电流（A）" dataIndex="bPhaseCurrent" />
            <Column title="C相电流（A）" dataIndex="cPhaseCurrent" />
          </ColumnGroup>
          <ColumnGroup title="三相电压">
            <Column title="A相电压（V）" dataIndex="aPhaseVoltage" />
            <Column title="B相电压（V）" dataIndex="bPhaseVoltage" />
            <Column title="C相电压（V）" dataIndex="cPhaseVoltage" />
          </ColumnGroup>
          <Column title="总有功功率（W）" dataIndex="activePower"/>
          <Column title="模块1-机内散热器温度(℃)	" dataIndex="tansTemp1" width="150px" fixed={"right"}/>
          <Column title="模块2-机内散热器温度(℃)	" dataIndex="tansTemp2" width="150px" fixed={"right"}/>
        </Table>
      </div>
    )
  }
}
const mapStateToProps = (state: any) => {
  const { pageNo, pageSize, inverterId, tableData, totalSize } = state.inverterHistory
  return {
    pageNo,
    pageSize,
    inverterId,
    tableData,
    totalSize
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {  
    changeTableData(data: any) {
      dispatch(actionCreators.changeTableData(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable)