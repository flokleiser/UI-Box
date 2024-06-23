/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/preload.ts":
/*!************************!*\
  !*** ./src/preload.ts ***!
  \************************/
/***/ (() => {

eval("/**\n * The preload script runs before `index.html` is loaded\n * in the renderer. It has access to web APIs as well as\n * Electron's renderer process modules and some polyfilled\n * Node.js functions.\n *\n * https://www.electronjs.org/docs/latest/tutorial/sandbox\n */\n\n// const { contextBridge, ipcRenderer} = require('electron/renderer')\n\n// contextBridge.exposeInMainWorld('electron', {\n//     ipcRenderer: ipcRenderer,\n// });\n\n// contextBridge.exposeInMainWorld('darkMode', {\n//   toggle: () => ipcRenderer.invoke('dark-mode:toggle'),\n//   system: () => ipcRenderer.invoke('dark-mode:system'),\n//   getThemeSource: () => ipcRenderer.invoke('dark-mode:get-theme-source')\n// })\n\n//# sourceURL=webpack://ui-box-typescript/./src/preload.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/preload.ts"]();
/******/ 	
/******/ })()
;