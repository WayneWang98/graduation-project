import React, { Component } from 'react'

import { Table } from 'antd'

import styles from '../style.module.less'
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '类型名称',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'ip地址',
    dataIndex: 'ipAddress',
    key: 'ipAddress'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作',
    key: 'handle',
    render: (text: any, record: any) => (
      <span>
        <span style={{ marginRight: 16 }} >修改</span>
        <span>删除</span>
      </span>
    ),
  }
]

const data = [
  {
    key: '1',
    id: '1',
    type: 'John Brown',
    ipAddress: '1.1.1.1',
    status: '1',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    id: '3',
    type: 'John Brown',
    ipAddress: '1.1.1.1',
    status: '1',
    address: 'New York No. 1 Lake Park',
  },
  
]

class EquipmentTable extends Component {
  render() {
    return (
      <div className={styles['table-container']}>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default EquipmentTable