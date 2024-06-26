/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

// const { contextBridge, ipcRenderer} = require('electron/renderer')
const { contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: ipcRenderer,
});

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
  getThemeSource: () => ipcRenderer.invoke('dark-mode:get-theme-source'),

  // onThemeChange: (callback: () => void) => ipcRenderer.on('theme-changed', callback)
})