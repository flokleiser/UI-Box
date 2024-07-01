"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const react_1 = __importDefault(require("react"));
function Home({ loadPage }) {
    const handleSettingsClick = () => {
        window.loadPage('Settings');
    };
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' } },
                react_1.default.createElement("h1", null, " UI-Box"),
                react_1.default.createElement("button", { className: "navbarButton", id: "settingsButton", style: { opacity: 0.5 }, onMouseDown: handleSettingsClick },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "settings"))),
            react_1.default.createElement("div", { className: "logo" },
                react_1.default.createElement("img", { className: "logoImg", src: "./media/icon.png" })))));
}
