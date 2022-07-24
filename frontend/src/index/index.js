import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.js'
import Body from './components/Body.js';
import './index.css';

const appName = "Planner - Vismix"

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <Body/>
  </React.StrictMode>,
  document.getElementById('orbital-frame')
);
