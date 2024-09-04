/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const electron_1 = __webpack_require__(/*! electron */ "electron");
const url_1 = __webpack_require__(/*! url */ "url");
let mainWindow = null;
// let mainWindow: BrowserWindow
if (false) {}
const isDebug =  true || 0;
// if (isDebug) {
//   require('electron-debug')();
// }
// const createWindow = async () => {
const createWindow = () => {
    mainWindow = new electron_1.BrowserWindow({
        show: false,
        width: 850,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
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
    if (true) {
        const port = process.env.PORT || 1212;
        const url = new url_1.URL(`http://localhost:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    }
    //   return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
    return `file://${path_1.default.resolve(__dirname, '../', htmlFileName)}`;
}


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map