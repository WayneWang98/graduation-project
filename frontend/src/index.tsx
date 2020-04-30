import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ConfigProvider } from 'antd' // ConfigProvider全局化配置
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
)

