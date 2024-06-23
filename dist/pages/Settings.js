"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Settings;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
function Settings() {
    const [activeThemeSource, setThemeSource] = (0, react_2.useState)('system');
    // useEffect(() => {
    //     async function fetchThemeSource() {
    //         const currentThemeSource = await window.darkMode.getThemeSource();
    //         setThemeSource(currentThemeSource);
    //     }
    //     fetchThemeSource();
    // }, []);
    // function toggleDarkMode() {
    //     window.darkMode.toggle().then(() => {
    //         window.darkMode.getThemeSource().then(setThemeSource)
    //     })
    // }
    // function toggleSystemMode() {
    //     window.darkMode.system()
    //     window.darkMode.getThemeSource().then(setThemeSource)
    //     // setDarkMode(false);
    //     // setLightMode(true);
    // }
    // function themeSourceDisplay() {
    //     if (activeThemeSource === 'dark') {
    //         return 'Dark';
    //     } else if (activeThemeSource === 'light') {
    //         return 'Light';
    //     } else {
    //         return 'System';
    //     }
    // }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Settings"),
        react_1.default.createElement("p", null,
            "Current:",
            react_1.default.createElement("strong", { id: "theme-source" })),
        react_1.default.createElement("button", { className: "buttonInSettings", id: "toggle-dark-mode" }, "Toggle Dark Mode"),
        react_1.default.createElement("button", { className: "buttonInSettings", id: "reset-to-system" }, "Reset to System Theme"),
        react_1.default.createElement("p", null,
            "Navbar alignment:",
            react_1.default.createElement("strong", null, "not yet implemented"))));
}
