import React, { Component } from 'react'

import { Table } from 'antd'


const { Column, ColumnGroup } = Table
let data: any = []

for (let i = 0; i < 10; i ++) {
  data.push({
    key: i,
    times: (new Date()).toLocaleString(),
    dailyOutput: 10 + i,
    totalOutput: 121,
    aPhaseCurrent: 12,
    bPhaseCurrent: 33,
    cPhaseCurrent: 23,
    aPhaseVoltage: 11,
    bPhaseVoltage: 32,
    cPhaseVoltage: 19,
    totalActivePower: 366,
    tansTemp1: 22.6,
    tansTemp2: 21.5
  })
}

class DataTable extends Component {
  render() {
    return (
      <div>
        <Table dataSource={data} bordered={true}
          scroll={{ x: 1500, y: 400 }}   
          pagination={{
            total: 100,
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20']
          }}
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
          <Column title="总有功功率（W）" dataIndex="totalActivePower"/>
          <Column title="模块1-机内散热器温度(℃)	" dataIndex="tansTemp1" width="150px" fixed={"right"}/>
          <Column title="模块2-机内散热器温度(℃)	" dataIndex="tansTemp2" width="150px" fixed={"right"}/>
        </Table>
      </div>
    )
  }
}

export default DataTable