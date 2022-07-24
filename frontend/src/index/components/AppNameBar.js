import React, { useState } from "react";
import "./App.css";
import closeWindow from '../asset/img/closeWindow.svg'
import maxWindow from '../asset/img/maxWindow.svg'
import minWindow from '../asset/img/minWindow.svg'

const { remote } = window.require('electron');


function AppNameBar({appName}) {

  const [isWinMax, setIsWinMax] = useState(false)

  function handleMinimize(){
    var window = remote.BrowserWindow.getFocusedWindow();
    window.minimize();
  }
  

  function handleMaximize(){
    var window = remote.BrowserWindow.getFocusedWindow();
    window.isMaximized() ? window.unmaximize() : window.maximize();
    setIsWinMax(!isWinMax);
  }

  function handleClose(){
    var window = remote.BrowserWindow.getFocusedWindow();
    window.close();
  }
  
  return (
    <div className="nav-bar flex min-w-full justify-between items-center bg-dark-grey">
      <div className="dummy-container"></div>
      <span className="leading-6 text-font-grey text-ssm">{appName}</span>
      <div className="flex">
        <button>
          <img className="window-control-btn box-border h-9 w-12 p-4 py-3 hover:bg-win-btn-hover-grey" src={minWindow} alt="minWindow" onClick={handleMinimize}></img>
        </button>
        <button>
          <img className="window-control-btn box-border h-9 w-12 p-3 py-3 hover:bg-win-btn-hover-grey" src={maxWindow} alt="maxWindow" onClick={handleMaximize}></img>
        </button>
        <button>
          <img className="window-control-btn box-border h-9 w-12 p-3 py-3 hover:bg-warning-red" src={closeWindow} alt="closeWindow" onClick={handleClose}></img>
        </button>
      </div>
    </div>
  );
}

export default AppNameBar;