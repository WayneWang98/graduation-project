import React, { Component } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'


import styles from '../style.module.less'

class ToolBar extends Component {
  render() {
    return (
      <div className={styles['tool-container']}>
        <Button type="primary" icon={<PlusOutlined />}>
          添加
        </Button>
      </div>
    )
  }
}

export default ToolBar