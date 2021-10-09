import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/index'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN' // 引入中文包
import './App.css'
import EnergyAnalysis from '@/page/EnergyAnalysis/index';

const Root = () => (
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <EnergyAnalysis />
    </Provider>
  </ConfigProvider>
)
ReactDOM.render(<Root />, document.getElementById('root'))
