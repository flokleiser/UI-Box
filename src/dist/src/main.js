"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const url_1 = require("url");
let mainWindow = null;
// let mainWindow: BrowserWindow
if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}
const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';
// if (isDebug) {
//   require('electron-debug')();
// }
// const createWindow = async () => {
const createWindow = () => {
    mainWindow = new electron_1.BrowserWindow({
        show: false,
        width: 800,
        height: 600,
        webPreferences: {
            preload: electron_1.app.isPackaged
                ? path_1.default.join(__dirname, 'preload.js')
                : path_1.default.join(__dirname, '../../.erb/dll/preload.js'),
        },
    });
    mainWindow.loadURL(resolveHtmlPath('index.html'));
    mainWindow.webContents.openDevTools();
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    electron_1.nativeTheme.on('updated', () => {
        mainWindow.webContents.send('theme-changed');
    });
    electron_1.ipcMain.handle('dark-mode:toggle', () => {
        if (electron_1.nativeTheme.shouldUseDarkColors) {
            electron_1.nativeTheme.themeSource = 'light';
        }
        else {
            electron_1.nativeTheme.themeSource = 'dark';
        }
        return electron_1.nativeTheme.shouldUseDarkColors;
    });
    electron_1.ipcMain.handle('dark-mode:system', () => {
        electron_1.nativeTheme.themeSource = 'system';
    });
    electron_1.ipcMain.handle('dark-mode:get-theme-source', () => {
        return electron_1.nativeTheme.themeSource;
    });
};
electron_1.app.on('window-all-closed', () => {
    electron_1.app.quit();
});
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (mainWindow === null)
            createWindow();
    });
});
function resolveHtmlPath(htmlFileName) {
    if (process.env.NODE_ENV === 'development') {
        const port = process.env.PORT || 1212;
        const url = new url_1.URL(`http://localhost:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    }
    //   return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
    return `file://${path_1.default.resolve(__dirname, '../', htmlFileName)}`;
}
//# sourceMappingURL=main.js.map