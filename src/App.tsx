import React, { FC } from 'react';
import ReactDOM from 'react-dom'
import { Button } from 'antd';
import './App.css';

const App: FC = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'))
