
const path = require('path');
const url = require('url');

const { app, BrowserWindow } = require('electron');

let mainWindow;
let dev;


if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) { // eslint-disable-line max-len
  dev = true;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 768,
    resizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  let indexPath;

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    if (dev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(`${require('./package.json').name} v${require('./package.json').version}`); // eslint-disable-line global-require
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
