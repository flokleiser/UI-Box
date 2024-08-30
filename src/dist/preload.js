(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/preload.ts ***!
  \************************/

/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
// const { contextBridge, ipcRenderer} = require('electron/renderer')
const { contextBridge, ipcRenderer } = __webpack_require__(/*! electron */ "electron");
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: ipcRenderer,
});
contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system'),
    getThemeSource: () => ipcRenderer.invoke('dark-mode:get-theme-source'),
    // onThemeChange: (callback: () => void) => ipcRenderer.on('theme-changed', callback)
});

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7OztBQ3RCQTs7Ozs7OztHQU9HO0FBRUgscUVBQXFFO0FBQ3JFLE1BQU0sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFDLEdBQUcsbUJBQU8sQ0FBQywwQkFBVSxDQUFDO0FBRXpELGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUU7SUFDeEMsV0FBVyxFQUFFLFdBQVc7Q0FDM0IsQ0FBQyxDQUFDO0FBRUgsYUFBYSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRTtJQUMxQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUNwRCxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUNwRCxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQztJQUV0RSxxRkFBcUY7Q0FDdEYsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8qKlxuICogVGhlIHByZWxvYWQgc2NyaXB0IHJ1bnMgYmVmb3JlIGBpbmRleC5odG1sYCBpcyBsb2FkZWRcbiAqIGluIHRoZSByZW5kZXJlci4gSXQgaGFzIGFjY2VzcyB0byB3ZWIgQVBJcyBhcyB3ZWxsIGFzXG4gKiBFbGVjdHJvbidzIHJlbmRlcmVyIHByb2Nlc3MgbW9kdWxlcyBhbmQgc29tZSBwb2x5ZmlsbGVkXG4gKiBOb2RlLmpzIGZ1bmN0aW9ucy5cbiAqXG4gKiBodHRwczovL3d3dy5lbGVjdHJvbmpzLm9yZy9kb2NzL2xhdGVzdC90dXRvcmlhbC9zYW5kYm94XG4gKi9cblxuLy8gY29uc3QgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlcn0gPSByZXF1aXJlKCdlbGVjdHJvbi9yZW5kZXJlcicpXG5jb25zdCB7IGNvbnRleHRCcmlkZ2UsIGlwY1JlbmRlcmVyfSA9IHJlcXVpcmUoJ2VsZWN0cm9uJylcblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb24nLCB7XG4gICAgaXBjUmVuZGVyZXI6IGlwY1JlbmRlcmVyLFxufSk7XG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2RhcmtNb2RlJywge1xuICB0b2dnbGU6ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnZGFyay1tb2RlOnRvZ2dsZScpLFxuICBzeXN0ZW06ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZSgnZGFyay1tb2RlOnN5c3RlbScpLFxuICBnZXRUaGVtZVNvdXJjZTogKCkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKCdkYXJrLW1vZGU6Z2V0LXRoZW1lLXNvdXJjZScpLFxuXG4gIC8vIG9uVGhlbWVDaGFuZ2U6IChjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4gaXBjUmVuZGVyZXIub24oJ3RoZW1lLWNoYW5nZWQnLCBjYWxsYmFjaylcbn0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9