import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './main/Layout'
import NotFound from './main/NotFound'
import Login from './page/Login'
import './style.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Layout />} errorElement={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
