import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'
import NavWrapper from '@/component/NavWrapper'
import Login from '@/page/Login'
import { routerConfig } from './router'
import { Spin } from 'antd'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route
          path=""
          render={() => (
            <div className="app-root">
              <NavWrapper>
                <Switch>
                  <Suspense fallback={<Spin spinning />}>
                    {routerConfig.map((it) => (
                      <Route exact path={it.path} component={it.component} />
                    ))}
                  </Suspense>
                </Switch>
              </NavWrapper>
            </div>
          )}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App
