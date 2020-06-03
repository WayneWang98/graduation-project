import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import axios from 'axios'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styles from './style.module.less'

const domain = 'http://localhost:7001'
interface PropsTypes extends RouteComponentProps {
  
}
class Login extends Component<PropsTypes> {
  constructor (props: any) {
    super(props)
    this.onFinish = this.onFinish.bind(this)
  }
  onFinish (values: any) {
    const { username, password } = values
    const data = {
      username,
      password
    }
    axios.post(domain + '/user/login', data).then(res => {
      let result = res.data.data.success
      if (result === 'success') {
        this.props.history.push('/power_station_preview')
      } else {
        message.error('用户名或密码错误！')
      }
    })
  }
  render() {
    return (
      <div className={styles['container']}>
        <h3 className={styles['title']}>光伏电站监控云平台</h3>
        <div className={styles['login-form']}>
          <div className={styles['form']}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                  忘记密码
                </a>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;没有账号？ <a href="">立即注册</a>
              </Form.Item>
            </Form>
          </div>
        </div>
        
      </div>
    )
  }
}
export default withRouter(Login as any)