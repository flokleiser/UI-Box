"use strict";
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else {
        var a = factory();
        for (var i in a)
            (typeof exports === 'object' ? exports : root)[i] = a[i];
    }
})(global, () => {
    return /******/ (() => {
        /******/ "use strict";
        /******/ var __webpack_modules__ = ({
            /***/ "electron": 
            /*!***************************!*\
              !*** external "electron" ***!
              \***************************/
            /***/ ((module) => {
                module.exports = require("electron");
                /***/ 
            }),
            /***/ "path": 
            /*!***********************!*\
              !*** external "path" ***!
              \***********************/
            /***/ ((module) => {
                module.exports = require("path");
                /***/ 
            }),
            /***/ "url": 
            /*!**********************!*\
              !*** external "url" ***!
              \**********************/
            /***/ ((module) => {
                module.exports = require("url");
                /***/ 
            })
            /******/ 
        });
        /************************************************************************/
        /******/ // The module cache
        /******/ var __webpack_module_cache__ = {};
        /******/
        /******/ // The require function
        /******/ function __webpack_require__(moduleId) {
            /******/ // Check if module is in cache
            /******/ var cachedModule = __webpack_module_cache__[moduleId];
            /******/ if (cachedModule !== undefined) {
                /******/ return cachedModule.exports;
                /******/ }
            /******/ // Create a new module (and put it into the cache)
            /******/ var module = __webpack_module_cache__[moduleId] = {
                /******/ // no module.id needed
                /******/ // no module.loaded needed
                /******/ exports: {}
                /******/ 
            };
            /******/
            /******/ // Execute the module function
            /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
            /******/
            /******/ // Return the exports of the module
            /******/ return module.exports;
            /******/ 
        }
        /******/
        /************************************************************************/
        /******/ /* webpack/runtime/compat get default export */
        /******/ (() => {
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/ __webpack_require__.n = (module) => {
                /******/ var getter = module && module.__esModule ?
                    /******/ () => (module['default']) :
                    /******/ () => (module);
                /******/ __webpack_require__.d(getter, { a: getter });
                /******/ return getter;
                /******/ 
            };
            /******/ 
        })();
        /******/
        /******/ /* webpack/runtime/define property getters */
        /******/ (() => {
            /******/ // define getter functions for harmony exports
            /******/ __webpack_require__.d = (exports, definition) => {
                /******/ for (var key in definition) {
                    /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                        /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                        /******/ }
                    /******/ }
                /******/ 
            };
            /******/ 
        })();
        /******/
        /******/ /* webpack/runtime/hasOwnProperty shorthand */
        /******/ (() => {
            /******/ __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
            /******/ 
        })();
        /******/
        /******/ /* webpack/runtime/make namespace object */
        /******/ (() => {
            /******/ // define __esModule on exports
            /******/ __webpack_require__.r = (exports) => {
                /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                    /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                    /******/ }
                /******/ Object.defineProperty(exports, '__esModule', { value: true });
                /******/ 
            };
            /******/ 
        })();
        /******/
        /************************************************************************/
        var __webpack_exports__ = {};
        /*!*********************!*\
          !*** ./src/main.ts ***!
          \*********************/
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
        /* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
        /* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
        /* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "url");
        /* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
        let mainWindow = null;
        // let mainWindow: BrowserWindow
        if (false) { }
        const isDebug = true || 0;
        // if (isDebug) {
        //   require('electron-debug')();
        // }
        // const createWindow = async () => {
        const createWindow = () => {
            mainWindow = new electron__WEBPACK_IMPORTED_MODULE_1__.BrowserWindow({
                show: false,
                width: 800,
                height: 600,
                webPreferences: {
                    preload: electron__WEBPACK_IMPORTED_MODULE_1__.app.isPackaged
                        ? path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, 'preload.js')
                        : path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, '../../.erb/dll/preload.js'),
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
            electron__WEBPACK_IMPORTED_MODULE_1__.nativeTheme.on('updated', () => {
                mainWindow.webContents.send('theme-changed');
            });
            electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.handle('dark-mode:toggle', () => {
                if (electron__WEBPACK_IMPORTED_MODULE_1__.nativeTheme.shouldUseDarkColors) {
                    electron__WEBPACK_IMPORTED_MODULE_1__.nativeTheme.themeSource = 'light';
                }
                else {
                    electron__WEBPACK_IMPORTED_MODULE_1__.nativeTheme.themeSource = 'dark';
                }
                return electron__WEBPACK_IMPORTED_MODULE_1__.nativeTheme.shouldUseDarkColors;
            });
            electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.handle('dark-mode:system', () => {
                electron__WEBPACK_IMPORTED_MODULE_1__.nativeTheme.themeSource = 'system';
            });
            electron__WEBPACK_IMPORTED_MODULE_1__.ipcMain.handle('dark-mode:get-theme-source', () => {
                return electron__WEBPACK_IMPORTED_MODULE_1__.nativeTheme.themeSource;
            });
        };
        electron__WEBPACK_IMPORTED_MODULE_1__.app.on('window-all-closed', () => {
            electron__WEBPACK_IMPORTED_MODULE_1__.app.quit();
        });
        electron__WEBPACK_IMPORTED_MODULE_1__.app.whenReady().then(() => {
            createWindow();
            electron__WEBPACK_IMPORTED_MODULE_1__.app.on('activate', () => {
                if (mainWindow === null)
                    createWindow();
            });
        });
        function resolveHtmlPath(htmlFileName) {
            if (true) {
                const port = process.env.PORT || 1212;
                const url = new url__WEBPACK_IMPORTED_MODULE_2__.URL(`http://localhost:${port}`);
                url.pathname = htmlFileName;
                return url.href;
            }
            //   return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
            return `file://${path__WEBPACK_IMPORTED_MODULE_0___default().resolve(__dirname, '../', htmlFileName)}`;
        }
        /******/ return __webpack_exports__;
        /******/ 
    })();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDO0FBRUYseUNBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQy9CLHlDQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDYixDQUFDLENBQUMsQ0FBQztBQUVILHlDQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUN4QixZQUFZLEVBQUUsQ0FBQztJQUNmLHlDQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDdEIsSUFBSSxVQUFVLEtBQUssSUFBSTtZQUFFLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLGVBQWUsQ0FBQyxZQUFvQjtJQUMzQyxJQUFJLElBQXNDLEVBQUUsQ0FBQztRQUMzQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7UUFDdEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQ0FBRyxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELEdBQUcsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1FBQzVCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0lBQ0gsOEVBQThFO0lBQzVFLE9BQU8sVUFBVSxtREFBWSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQztBQUNsRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ1cmxcIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKGdsb2JhbCwgKCkgPT4ge1xucmV0dXJuICIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGFwcCwgQnJvd3NlcldpbmRvdywgaXBjTWFpbiwgbmF0aXZlVGhlbWUgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBVUkwgfSBmcm9tICd1cmwnO1xuXG5sZXQgbWFpbldpbmRvdzogQnJvd3NlcldpbmRvdyB8IG51bGwgPSBudWxsO1xuLy8gbGV0IG1haW5XaW5kb3c6IEJyb3dzZXJXaW5kb3dcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgY29uc3Qgc291cmNlTWFwU3VwcG9ydCA9IHJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpO1xuICBzb3VyY2VNYXBTdXBwb3J0Lmluc3RhbGwoKTtcbn1cblxuY29uc3QgaXNEZWJ1ZyA9XG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnIHx8IHByb2Nlc3MuZW52LkRFQlVHX1BST0QgPT09ICd0cnVlJztcblxuLy8gaWYgKGlzRGVidWcpIHtcbi8vICAgcmVxdWlyZSgnZWxlY3Ryb24tZGVidWcnKSgpO1xuLy8gfVxuXG4vLyBjb25zdCBjcmVhdGVXaW5kb3cgPSBhc3luYyAoKSA9PiB7XG5jb25zdCBjcmVhdGVXaW5kb3cgPSAoKSA9PiB7XG4gIG1haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgc2hvdzogZmFsc2UsXG4gICAgd2lkdGg6IDgwMCxcbiAgICBoZWlnaHQ6IDYwMCxcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgcHJlbG9hZDogYXBwLmlzUGFja2FnZWRcbiAgICAgICAgPyBwYXRoLmpvaW4oX19kaXJuYW1lLCAncHJlbG9hZC5qcycpXG4gICAgICAgIDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uLy5lcmIvZGxsL3ByZWxvYWQuanMnKSxcbiAgICB9LFxuICB9KTtcblxuICBtYWluV2luZG93LmxvYWRVUkwocmVzb2x2ZUh0bWxQYXRoKCdpbmRleC5odG1sJykpO1xuICBtYWluV2luZG93LndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpO1xuXG4gIG1haW5XaW5kb3cub24oJ3JlYWR5LXRvLXNob3cnLCAoKSA9PiB7XG4gICAgbWFpbldpbmRvdyEuc2hvdygpO1xuICB9KTtcblxuICBtYWluV2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XG4gICAgbWFpbldpbmRvdyA9IG51bGw7XG4gIH0pO1xuXG4gIG5hdGl2ZVRoZW1lLm9uKCd1cGRhdGVkJywgKCkgPT4ge1xuICAgIG1haW5XaW5kb3chLndlYkNvbnRlbnRzLnNlbmQoJ3RoZW1lLWNoYW5nZWQnKTtcbiAgfSk7XG5cbiAgaXBjTWFpbi5oYW5kbGUoJ2RhcmstbW9kZTp0b2dnbGUnLCAoKSA9PiB7XG4gICAgaWYgKG5hdGl2ZVRoZW1lLnNob3VsZFVzZURhcmtDb2xvcnMpIHtcbiAgICAgIG5hdGl2ZVRoZW1lLnRoZW1lU291cmNlID0gJ2xpZ2h0JztcbiAgICB9IGVsc2Uge1xuICAgICAgbmF0aXZlVGhlbWUudGhlbWVTb3VyY2UgPSAnZGFyayc7XG4gICAgfVxuICAgIHJldHVybiBuYXRpdmVUaGVtZS5zaG91bGRVc2VEYXJrQ29sb3JzO1xuICB9KTtcblxuICBpcGNNYWluLmhhbmRsZSgnZGFyay1tb2RlOnN5c3RlbScsICgpID0+IHtcbiAgICBuYXRpdmVUaGVtZS50aGVtZVNvdXJjZSA9ICdzeXN0ZW0nO1xuICB9KTtcblxuICBpcGNNYWluLmhhbmRsZSgnZGFyay1tb2RlOmdldC10aGVtZS1zb3VyY2UnLCAoKSA9PiB7XG4gICAgcmV0dXJuIG5hdGl2ZVRoZW1lLnRoZW1lU291cmNlO1xuICB9KTtcbn07XG5cbmFwcC5vbignd2luZG93LWFsbC1jbG9zZWQnLCAoKSA9PiB7XG4gIGFwcC5xdWl0KCk7XG59KTtcblxuYXBwLndoZW5SZWFkeSgpLnRoZW4oKCkgPT4ge1xuICBjcmVhdGVXaW5kb3coKTtcbiAgYXBwLm9uKCdhY3RpdmF0ZScsICgpID0+IHtcbiAgICBpZiAobWFpbldpbmRvdyA9PT0gbnVsbCkgY3JlYXRlV2luZG93KCk7XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIHJlc29sdmVIdG1sUGF0aChodG1sRmlsZU5hbWU6IHN0cmluZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICBjb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAxMjEyO1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fWApO1xuICAgIHVybC5wYXRobmFtZSA9IGh0bWxGaWxlTmFtZTtcbiAgICByZXR1cm4gdXJsLmhyZWY7XG4gIH1cbi8vICAgcmV0dXJuIGBmaWxlOi8vJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vcmVuZGVyZXIvJywgaHRtbEZpbGVOYW1lKX1gO1xuICByZXR1cm4gYGZpbGU6Ly8ke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8nLCBodG1sRmlsZU5hbWUpfWA7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
//# sourceMappingURL=preload.js.map