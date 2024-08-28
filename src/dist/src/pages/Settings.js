"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Settings;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Settings() {
    const [activeThemeSource, setThemeSource] = (0, react_1.useState)('system');
    // const handleHomeClick= () => {
    //     window.loadPage('Home');
    // };
    const handleTestClick = () => {
        window.loadPage('Test');
    };
    (0, react_1.useEffect)(() => {
        async function fetchThemeSource() {
            const currentThemeSource = await window.darkMode.getThemeSource();
            setThemeSource(currentThemeSource);
        }
        fetchThemeSource();
    }, []);
    function toggleDarkMode() {
        window.darkMode.toggle().then(() => {
            window.darkMode.getThemeSource().then(setThemeSource);
        });
    }
    function toggleSystemMode() {
        window.darkMode.system();
        window.darkMode.getThemeSource().then(setThemeSource);
    }
    function themeSourceDisplay() {
        if (activeThemeSource === 'dark') {
            return 'Dark';
        }
        else if (activeThemeSource === 'light') {
            return 'Light';
        }
        else {
            return 'System';
        }
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "bodyCenter", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)("h1", { children: "Settings" }), (0, jsx_runtime_1.jsx)("button", { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)' }, id: "settingsButton", onMouseDown: handleTestClick, children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "quiz" }) })] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Current: ", (0, jsx_runtime_1.jsxs)("strong", { id: "theme-source", children: [" ", themeSourceDisplay()] })] }), (0, jsx_runtime_1.jsx)("button", { className: "buttonInSettings", id: "toggle-dark-mode", onMouseDown: toggleDarkMode, children: "Toggle Dark Mode" }), (0, jsx_runtime_1.jsx)("button", { className: "buttonInSettings", id: "reset-to-system", onMouseDown: toggleSystemMode, children: "Reset to System Theme" })] }) }));
}
//# sourceMappingURL=Settings.js.map