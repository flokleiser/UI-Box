import { app, ipcMain, BrowserWindow, nativeTheme } from 'electron'
import path from 'node:path'

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('./src/index.html')

  mainWindow.webContents.openDevTools()

  mainWindow.removeMenu()


  //test
nativeTheme.on('updated', () => {
  mainWindow.webContents.send('theme-changed');
});
//test end

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})

ipcMain.handle('dark-mode:get-theme-source', () => {
  return nativeTheme.themeSource;
});
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  app.quit()
})
