//导入React,作为所有代码的api支撑
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
//定义一个函数
// import Hello from './Hello';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Hello />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
