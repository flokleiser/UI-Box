"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const jsx_runtime_1 = require("react/jsx-runtime");
const framer_motion_1 = require("framer-motion");
const icon_png_1 = __importDefault(require("../../assets/media/icon.png"));
function Home() {
    const handleSettingsClick = () => {
        window.loadPage('Settings');
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "bodyCenter", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                    }, children: [(0, jsx_runtime_1.jsx)("h1", { children: " UI-Box HotReloading" }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)' }, id: "settingsButton", onMouseDown: handleSettingsClick, whileHover: { rotate: 180 }, children: (0, jsx_runtime_1.jsx)("span", { className: "material-symbols-outlined", children: "settings" }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "logo", children: (0, jsx_runtime_1.jsx)("img", { className: 'logoImg', src: icon_png_1.default }) })] }) }));
}
//# sourceMappingURL=Home.js.map