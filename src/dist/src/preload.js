"use strict";
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: ipcRenderer,
});
contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system'),
    getThemeSource: () => ipcRenderer.invoke('dark-mode:get-theme-source'),
    // onThemeChange: (callback: () => void) => ipcRenderer.on('theme-changed', callback)
});
//# sourceMappingURL=preload.js.map