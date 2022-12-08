import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './main/Layout'
import './style.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
