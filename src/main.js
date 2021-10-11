// main.js

// Modules to control application life and create native browser window
var axios = require('axios');
var FormData = require('form-data');
const { app, BrowserWindow, ipcMain } = require("electron");
var child = require('child_process').execFile;
const fs = require("../utility/filesystem").FileSystem
const isDev = require("electron-is-dev")
const path = require("path");

let mainWindow,
  appName = "Planner - Orbital",
  isReady = false,
  configRead = false; // control the menu bar info

function createWindow() {
  // Create the browser window.
  var width = 500, height = 300;

  const options = {
    backgroundColor: '#1D1D1E',
    width: 1859,
    height: 1044,
    minWidth: 1600,
    minHeight: 850,
    textAreasAreResizable: false,
    plugins: true,
    show: false, // Don't show it until it's ready to prevent showing a blank screen.
    frame: false,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Prevent window.require throwing an error
      enableRemoteModule: true
      // backgroundThrottling: false,
    }
  };

  /** TODO - add app icon */
  // options.icon = path.join(__dirname, '/../www/assets/icon/icon.png');

  mainWindow = new BrowserWindow(options);

  mainWindow.loadURL(isDev ? "http://localhost:3000/src/index.html" : 
                              `file://${path.join(__dirname, "../build/login/login.html")}`) 
  // mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object.
    mainWindow = null;
  });
}

// Make sure that only a single instance of the app is running.
// For some reason, gotTheLock is always false in signed Mac apps so we should ingore it.
// See https://github.com/electron/electron/issues/15958
var gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock && process.platform !== "darwin") {
  // It's not the main instance of the app, kill it.
  app.exit();
  return;
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});


/** IPC Handling */

ipcMain.handle("get-timetable", (event, [semester, numToTake, coursesList]) => {  
  console.log("array des", semester, numToTake, coursesList)
  var result = ""
  var data = new FormData();
  data.append('sem', semester);
  data.append('numToTake', numToTake);
  data.append('targetCourseCode', coursesList);

  var config = {
    method: 'post',
    url: 'https://generate-all-schedules.azurewebsites.net/api/get-all-possible-timetables',
    headers: { 
      ...data.getHeaders()
    },
    data: data
  };

  return new Promise ((resolve, _) => {
    axios(config)
      .then(function (response) {
        console.log("Success", response.data);
        resolve({'status': 'Success', 'details': JSON.parse(JSON.stringify(response.data))})
      })
      .catch(function (error) {
        console.log(error)
        resolve(error)
      });
    
      // child(solverPath, [semester, numToTake, coursesList], function(err, data) {
      //   if (err){
    //     console.log(err)
    //   }
    //   result = data.toString();
    //   console.log({'status': 'Success', 'details': result})
    //   try {
    //     // event.returnValue = JSON.parse(result)
    //     resolve(JSON.parse(result))
    //   } catch (ex) {
    //     // event.returnValue = {'status': 'Failed', 'details': "[Main Process] Failed in running core."}
    //     resolve ({'status': 'Failed', 'details': "[Main Process] Failed in running core."})
    //   }
    // });
  });
})


ipcMain.on("get-courseData", (event) => {
  console.log("received get-courseData ipc")

  var config = {
    method: 'get',
    url: 'https://vismix-test-api-2.azure-api.net/get-course-data-engine/get_course_data',
    headers: { }
  };
  

  axios(config)
  .then(function (response) {
    // console.log(response.data);
    event.returnValue = {'status': 'Success', 'details': response.data}
  })
  .catch(function (error) {
    console.log(error);
  });


  // try {
  //   var course = JSON.parse(fs.readSync('course.json'))
  //   event.returnValue = {'status': 'Success', 'details': course}
  // } catch (ex) {
  //   event.returnValue = {'status': 'Failed', 'details': '[Main Process] Failed in reading courseData.'}
  // } 
})