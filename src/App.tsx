import React, { Fragment, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routerConfig } from './config/router'
import Layout from './main/Layout'
import NotFound from './main/NotFound'
import Login from './page/login'
import Home from './page/home'
import './style.scss'
import { useSelector } from 'react-redux'
import { RootState } from './store'

const App: React.FC = () => {
  const auth = useSelector<RootState>((state) => state.global.auth)
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>loading......</h1>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {routerConfig.filter((it) => it?.auth ? (auth as string[]).includes(it.auth) : true).map((it) => (
              <Route path={it.path} key={it.path} element={<it.element />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
