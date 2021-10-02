import React, { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import {Home} from '@/compoments/Home.jsx'
import {About} from '@/compoments/About.jsx'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '前端 11'
    }
  }
  componentDidMount () {
    console.log('123456');
  }
  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <BrowserRouter>
          <Link to='/home'>home</Link>
          <Link to='/about'>about</Link>
          <Route path='/home' component={Home} ></Route>
          <Route path='/about' component={About} ></Route>
        </BrowserRouter>
      </div>
    )
  }
}
