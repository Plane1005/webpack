import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/index'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN' // 引入中文包
import App from './App'
import './App.css'

const Root = () => (
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
