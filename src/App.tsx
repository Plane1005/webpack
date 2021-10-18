import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from '@/page/Home'

const App = (props: any) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </HashRouter>
  )
}

export default App
