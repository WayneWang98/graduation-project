import React, { Component } from 'react'
import { Input, Button, message} from 'antd'
import { connect } from 'react-redux'

import axios from 'axios'
import { actionCreators } from '../store'

interface PropsTypes {
  changeVerificationCode: (value: string) => void
}
interface StateTypes {
  [propName: string]: any
}
const domain = 'http://localhost:7001'
class ModalContent extends Component<PropsTypes, StateTypes> {
  constructor(props: any) {
    super(props)
    this.state = {
      verifyBtnValue: '发送验证码',
      btnDisabled: false
    }
    this.sendSms = this.sendSms.bind(this)
    this.changeCodeInput = this.changeCodeInput.bind(this)
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }
  sendSms() { // 发送短信验证码
    this.setState({
      btnDisabled: true
    })
    this.sendVerificationCode()
    let time = 60, value
    let clock = setInterval(() => {
      time --
      if (time === 0) {
        this.setState({
          btnDisabled: false
        })
        value = '发送验证码'
        clearInterval(clock)
      } else {
        value = time + 's后重新发送'
      }
      this.setState({
        verifyBtnValue: value
      })
    }, 1000)
  }
  sendVerificationCode() {
    axios.post(domain + '/user/get_verification_code').then(res => {
      const data = res.data.data
      if (data === 'ok') {
        message.success('验证码发送成功！')
      } else {
        message.error('验证码发送失败，请重试！')
      }
    })
  }
  changeCodeInput(e: any) { // 验证码输入框双向绑定
    const value = e.target.value
    this.props.changeVerificationCode(value)
  }
  render () {
    return (
      <div>
        <Input placeholder="请输入验证码" onChange={this.changeCodeInput}/>
        <Button type="primary" onClick={this.sendSms} disabled={this.state.btnDisabled}>{this.state.verifyBtnValue}</Button>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {

  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    changeVerificationCode(value: string) {
      dispatch(actionCreators.changeVerificationCode(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent)