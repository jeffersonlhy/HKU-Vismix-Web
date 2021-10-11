import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import AppNameBar from './components/AppNameBar.js';
import Header from './components/Header.js'
import Body from './components/Body.js';

const appName = "Planner - Vismix"

ReactDOM.render(
  <React.StrictMode>
    {/* <AppNameBar appName = {appName}/> */}
    <Header/>
    <Body/>
  </React.StrictMode>,
  document.getElementById('orbital-frame')
);
