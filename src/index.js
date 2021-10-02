// import './js/image'
import './js/login'
import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'
import axios from 'axios';

const title = 'webpack'

const foo = () => {
  console.log(title);
}

foo()

const p = new Promise((res, rej) => {
  console.log('promise11');
})

console.log(p);

//@babel/plugin-transform-arrow-functions
//@babel/plugin-transform-block-scoping
ReactDom.render(<App />,document.getElementById('root'))

axios.get('/api/simpleWeather/query').then(res => {
  console.log(res);
})
