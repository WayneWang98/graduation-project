import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { actionCreators } from '../store'
import { Table, Modal, Input, message, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import ModalContent  from './ModalContent'
import styles from '../style.module.less'
import axios from 'axios'

import store from '../../../store'
interface PropsTypes {
  showModal: boolean,
  tableData: any,
  modalTitle: string,
  verificationCode: string,
  changeShowModal: () => void,
  changeTableData: () => void,
  changeModalTitle: () => void
}

interface StateTypes {
  [propName: string]: any
}

const domain = 'http://localhost:7001'
const { confirm } = Modal
class EquipmentTable extends Component<PropsTypes, StateTypes> {

  constructor(props: any) {
    super(props)
    this.state = {
      columns : [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '设备名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '出厂编号',
          dataIndex: 'factoryNumber',
          key: 'factoryNumber'
        },
        {
          title: '生产厂家',
          dataIndex: 'manufacture',
          key: 'manufacture'
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state'
        },
        {
          title: '操作',
          key: 'handle',
          render: (text: any, record: any) => {
            const { id, name, type, manufacture, factoryNumber } = record
            return (
              <span>
                <span style={{ marginRight: 16 }} onClick={() => {this.handleEquipmentChange({name, type, manufacture, factoryNumber, id})}}><a>修改</a></span>
                <span onClick={() => {this.handleDelete(id)}}><a>删除</a></span>
              </span>
            )
          }
        }
      ]
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.props.changeTableData()
  }

  handleDelete = (id: any) => { // 删除设备
    const that = this
    confirm({
      title: '删除设备是不可逆操作，需要进行短信验证！',
      icon: <ExclamationCircleOutlined />,
      content: 
        <Provider store={store}>
          <ModalContent></ModalContent>
        </Provider>,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk(close) {
        const code = that.props.verificationCode
        const data = {
          code
        }
        axios.post(domain + '/user/check_verification_code', data).then(res => {
          console.log(res)
          if (res.data.data === 'true') {
            message.success('验证成功，设备将被删除！')
            close()
            const data = { id }
            axios.post(domain + '/equipment/delete', data).then(res => {
              message.success('删除设备成功！')
              that.props.changeTableData()
            })
          } else {
            message.error('验证码错误，请重试！')
            close()
          }
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })

  }

  handleEquipmentChange = (data: any) => {
    this.setState({
      id: data.id,
      name: data.name,
      type: data.type,
      factoryNumber: data.factoryNumber,
      manufacture: data.manufacture
    })
    this.props.changeModalTitle()
    this.props.changeShowModal()
  }

  handleOk = (e: any) => {
    const data = {
      name: this.state.name,
      type: this.state.type,
      factoryNumber: this.state.factoryNumber,
      manufacture: this.state.manufacture
    }
    axios.post(domain + '/equipment/add', data).then(res => {
      message.success('添加设备成功！')
      this.props.changeTableData()
    })
    this.props.changeShowModal()
  }

  handleCancel = () => {
    this.props.changeShowModal()
  }

  handleInputChange(e: any) {
    const InputName = e.target.name
    const InputValue = e.target.value
    this.setState({
      [InputName]: InputValue 
    })
  }

  render() {
    const { name, type, factoryNumber, manufacture } = this.state
    return (
      <div className={styles['table-container']}>
        <Table columns={this.state.columns} dataSource={this.props.tableData} rowKey={'id'}/>
        <Modal
          title={this.props.modalTitle}
          visible={this.props.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className={styles['input-container']}>
            <Input placeholder="请输入设备名称" addonBefore="设备名称" value={name}
              name="name" onChange={this.handleInputChange}/>
          </div>
          <div className={styles['input-container']}>
            <Input placeholder="请输入设备类型" addonBefore="设备类型" value={type} 
             name="type" onChange={this.handleInputChange}/>
          </div>
          <div className={styles['input-container']}>
            <Input placeholder="请输入出厂编号" addonBefore="出厂编号" value={factoryNumber} 
              name="factoryNumber" onChange={this.handleInputChange}/>
          </div>
          <div className={styles['input-container']}>
            <Input placeholder="请输入生产厂家" addonBefore="生产厂家" value={manufacture} 
              name="manufacture" onChange={this.handleInputChange}/>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { showModal, tableData, modalTitle, verificationCode } = state.equipmentManagement
  return {
    showModal,
    tableData,
    modalTitle,
    verificationCode
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeShowModal() {
      dispatch(actionCreators.changeModalState())
    },
    changeTableData() {
      dispatch(actionCreators.changeTableData())
    },
    changeModalTitle() {
      dispatch(actionCreators.changeModalTitle('修改设备'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentTable)