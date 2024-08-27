import path from 'path';
import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import { URL } from 'url';

let mainWindow: BrowserWindow | null = null;
// let mainWindow: BrowserWindow

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

// if (isDebug) {
//   require('electron-debug')();
// }

// const createWindow = async () => {
const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    mainWindow!.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  nativeTheme.on('updated', () => {
    mainWindow!.webContents.send('theme-changed');
  });

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
  });

  ipcMain.handle('dark-mode:get-theme-source', () => {
    return nativeTheme.themeSource;
  });
};

app.on('window-all-closed', () => {
  app.quit();
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (mainWindow === null) createWindow();
  });
});

function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}
