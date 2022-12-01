import React from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { store } from './store/index'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN' // 引入中文包
import App from './App'

const Root: React.FC = () => (
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
)

createRoot(document.getElementById('root') as Element).render(<Root />)