import RefreshRuntime from '/@react-refresh';

/**
 * @description This file is used ONLY and EXCLUSIVE for development
 * When setting up the remote app, add this import
 * http://localhost:5173/@vite/refresh.js
 */

RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;

window.__vite_plugin_react_preamble_installed__ = true;