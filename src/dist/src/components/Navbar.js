"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Navbar = ({ activePage, onNavigate }) => {
    const [activeThemeSource, setThemeSource] = (0, react_1.useState)('system');
    function toggleDarkMode() {
        window.darkMode.toggle().then(() => {
            window.darkMode.getThemeSource().then(setThemeSource);
        });
    }
    const handlePageChange = (page) => {
        if (window.setActivePage) {
            window.setActivePage(page);
        }
    };
    const [isDark, setIsDark] = (0, react_1.useState)(false);
    function toggleIcon() {
        setIsDark(!isDark);
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "bodyCenter", style: { paddingTop: '0.75rem', paddingBottom: '0.35rem' }, children: (0, jsx_runtime_1.jsxs)("nav", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "navbarLeft", children: [(0, jsx_runtime_1.jsx)("button", { className: activePage === 'Home' ? "navbarButton active" : "navbarButton", id: "homeButton", onClick: () => {
                                onNavigate('Home');
                            }, children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "home" }) }), (0, jsx_runtime_1.jsx)("button", { className: activePage === 'Buttons' ? "navbarButton active" : "navbarButton", id: "buttonspageButton", onClick: () => {
                                onNavigate('Buttons');
                            }, children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "apps" }) }), (0, jsx_runtime_1.jsx)("button", { className: activePage === 'Spinner' ? "navbarButton active" : "navbarButton", id: "spinnerpageButton", onClick: () => onNavigate('Spinner'), children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "network_node" }) }), (0, jsx_runtime_1.jsx)("button", { className: activePage === 'Particles' ? "navbarButton active" : "navbarButton", id: "particlespageButton", onClick: () => onNavigate('Particles'), children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "lens_blur" }) }), (0, jsx_runtime_1.jsx)("button", { className: activePage === 'Switches' ? "navbarButton active" : "navbarButton", id: "switchespageButton", onClick: () => onNavigate('Switches'), children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "toggle_on" }) }), (0, jsx_runtime_1.jsx)("button", { className: activePage === 'Tether' ? "navbarButton active" : "navbarButton", id: "tetherpageButton", onClick: () => onNavigate('Tether'), children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "tenancy" }) }), (0, jsx_runtime_1.jsx)("button", { className: activePage === 'Ball' ? "navbarButton active" : "navbarButton", id: "ballpageButton", onClick: () => onNavigate('Ball'), children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "airline_stops" }) }), (0, jsx_runtime_1.jsx)("button", { className: activePage === 'Joystick' ? "navbarButton active" : "navbarButton", id: "joystickpageButton", onClick: () => onNavigate('Joystick'), children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "joystick" }) }), (0, jsx_runtime_1.jsx)("button", { className: activePage === 'Cube' ? "navbarButton active" : "navbarButton", id: "cubepageButton", onClick: () => onNavigate('Cube'), children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "deployed_code" }) }), (0, jsx_runtime_1.jsx)("button", { className: activePage === 'Musializer' ? "navbarButton active" : "navbarButton", id: "musializerpageButton", onClick: () => onNavigate('Musializer'), children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "pause_circle" }) })] }), (0, jsx_runtime_1.jsx)("button", { className: "settingsButton", id: "darkmodeToggleButton", onMouseDown: toggleIcon, onClick: () => {
                        toggleDarkMode();
                    }, children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", 
                        // whileHover={{rotate:180}}
                        style: { transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }, children: "contrast" }) })] }) }));
};
exports.default = Navbar;
//# sourceMappingURL=Navbar.js.map