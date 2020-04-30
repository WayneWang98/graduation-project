import React, { Component } from 'react'

import { Breadcrumb } from 'antd'

import styles from './style.module.less'

class MainBreadCrumb extends Component {
  render() {
    return (
      <div className={styles['main-bread']}>
        <Breadcrumb separator="">
          <Breadcrumb.Item>当前位置</Breadcrumb.Item>
          <Breadcrumb.Separator>:</Breadcrumb.Separator>
          <Breadcrumb.Item href="">光伏发电</Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item href="">电站预览</Breadcrumb.Item>
        </Breadcrumb>,
      </div>
    )
  }
}

export default MainBreadCrumb