"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPage = void 0;
exports.startPage = "Joystick";
const setActivePage = (page) => {
    console.log('setActivePage', page);
    const event = new CustomEvent('pageChange', { detail: { page } });
    window.dispatchEvent(event);
};
window.setActivePage = setActivePage;
exports.default = Window;
