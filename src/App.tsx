import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom'
import NavWrapper from '@/component/NavWrapper'
import Login from '@/page/Login'
import { routerConfig } from './router'
import { Spin } from 'antd'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {routerConfig.map((it) => (
          <Route path={it.path} key={it.path} element={<it.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
