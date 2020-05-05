import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { Breadcrumb } from 'antd'

import styles from './style.module.less'

interface StateTypes {
  pageName: string[]
}
interface PropsTypes {
  pageName: string[]
}

class MainBreadCrumb extends Component<PropsTypes, StateTypes> {
  
  render() {
    return (
      <div className={styles['main-bread']}>
        <Breadcrumb separator="">
          <Breadcrumb.Item>当前位置</Breadcrumb.Item>
          <Breadcrumb.Separator>:</Breadcrumb.Separator>
          <Breadcrumb.Item href="">{this.props.pageName[0]}</Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item href="">{this.props.pageName[1]}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    pageName: state.mainBreadCrumb.pageName
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBreadCrumb)