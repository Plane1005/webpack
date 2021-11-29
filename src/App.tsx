import React from 'react'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom'
import NavWrapper from '@/component/NavWrapper'
import Home from '@/page/Home'
import WorkList from '@/page/WorkList'
import AddWork from '@/page/WorkInfo'
import Login from '@/page/Login'
import UserCenter from '@/page/UserCenter'
import WorkDetail from '@/page/WorkDetail'

const App: React.FC = (props: any) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="" render={() => (
          <div className="app-root">
            <NavWrapper>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/worklist" component={WorkList} />
                <Route exact path="/usercenter" component={UserCenter} />
                <Route exact path="/addwork" component={AddWork} />
                <Route exact path="/workdetail" component={WorkDetail} />
              </Switch>
            </NavWrapper>
          </div>
        )} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
