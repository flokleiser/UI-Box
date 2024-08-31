"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = __importDefault(require("node:path"));
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: node_path_1.default.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadFile('./src/index.html');
    mainWindow.webContents.openDevTools();
    mainWindow.removeMenu();
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
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    electron_1.app.quit();
});
