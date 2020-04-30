import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import { 
  BulbOutlined,
  BarChartOutlined,
  SwapOutlined,
  HistoryOutlined,
  SettingOutlined
} from '@ant-design/icons'

import styles from './style.module.less'
import { ClickParam } from 'antd/lib/menu'

interface PropsTypes extends RouteComponentProps {}
const { SubMenu } = Menu

class LeftSide extends Component<PropsTypes> {
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5']
  state = {
    openKeys: ['sub1'],
  }

  onOpenChange = (openKeys: string[]) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1) || '' 
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  handleMenuItemClick = (clickParam: ClickParam) => {
    this.props.history.push(clickParam.key) // 点击左侧菜单进行页面跳转
  }

  render() {
    return (
      <div className={styles['left-side']}>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{ width: 256 }}
          onClick={this.handleMenuItemClick}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <BulbOutlined />
                <span>光伏发电</span>
              </span>
            }
          >
            <Menu.Item key="power_station_preview">电站预览</Menu.Item>
            <Menu.Item key="inverter_info">逆变器信息</Menu.Item>
            <Menu.Item key="3">发电质量</Menu.Item>
            <Menu.Item key="4">预测分析</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <BarChartOutlined />
                <span>负荷监控</span>
              </span>
            }
          >
            <Menu.Item key="energy_use_monitoring">用能监测</Menu.Item>
            <Menu.Item key="6">能效管理</Menu.Item>
            <Menu.Item key="7">统计分析</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <SwapOutlined />
                <span>发用电比较</span>
              </span>
            }
          >
            <Menu.Item key="9">发用电比较</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <HistoryOutlined />
                <span>历史数据</span>
              </span>
            }
          >
            <Menu.Item key="inverter_history">光伏数据</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub5"
            title={
              <span>
                <SettingOutlined />
                <span>设备信息</span>
              </span>
            }
          >
            <Menu.Item key="11">设备信息</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftSide)

