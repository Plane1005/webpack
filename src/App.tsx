import React from 'react'
import { HashRouter, Route, Switch, Router } from 'react-router-dom'
import NavWrapper from '@/component/NavWrapper'
import Home from '@/page/Home'
import List from '@/page/List'
import Login from '@/page/Login'

const App: React.FC = (props: any) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="" render={() => (
          <div className="app-root">
            <NavWrapper>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/list" component={List} />
              </Switch>
            </NavWrapper>
          </div>
        )} />
      </Switch>
    </HashRouter>
  )
}

export default App
