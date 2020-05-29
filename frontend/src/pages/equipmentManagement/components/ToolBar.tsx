import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'

import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import styles from '../style.module.less'

interface PropsTypes {
  changeShowModal: () => void,
  changeModalTitle: () => void,
  showModal: boolean,
  modalTitle: string
}

class ToolBar extends Component<PropsTypes> {
  constructor(props: any) {
    super(props)
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this)
  }

  handleAddBtnClick() {
    this.props.changeModalTitle()
    this.props.changeShowModal()
  }

  render() {
    const { showModal } = this.props
    return (
      <div className={styles['tool-container']}>
        <Button type="primary" icon={<PlusOutlined />} onClick={this.handleAddBtnClick} >
          添加
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { showModal, modalTitle } = state.equipmentManagement
  return {
    showModal,
    modalTitle
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeShowModal() {
      dispatch(actionCreators.changeModalState())
    },
    changeModalTitle() {
      dispatch(actionCreators.changeModalTitle('添加设备'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)