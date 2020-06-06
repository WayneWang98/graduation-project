import React, { Component } from 'react'
import cookie from 'react-cookies'
import { Menu } from 'antd'
import {
  CloudSyncOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'
import { ClickParam } from 'antd/lib/menu/index'

import styles from './style.module.less'

const { SubMenu } = Menu

class Header extends Component {
  state = {
    current: 'mail',
  }

  handleClick = (e: ClickParam) => {
    this.setState({
      current: e.key
    })
  }

  render () {
    return (
      <div>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" className={styles['header-menu']}>
          <Menu.Item key="homeTitle">
          <CloudSyncOutlined className={styles['main-icon']}/>
            <span className={styles['main-tittle']}>光伏电站监控平台</span>
          </Menu.Item>
          <Menu.Item key="homePage" disabled className={styles['header-menu-item']}> 
            <AppstoreOutlined />
            首页
          </Menu.Item>
          <Menu.Item key="powerStationsList">
            <UnorderedListOutlined />
            电站列表
          </Menu.Item>
          <Menu.Item key="welcome">
            <UserOutlined />
            {cookie.load('userId')}
          </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <SettingOutlined />
                设置
              </span>
            }
            key="setting"
          >
            <Menu.ItemGroup title="账户设置">
              <Menu.Item key="setting:1">修改密码</Menu.Item>
              <Menu.Item key="setting:2">注销</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default Header