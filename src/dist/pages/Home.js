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
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, " UI-Box "),
        react_1.default.createElement("div", { className: "settingsButton", style: { position: 'absolute', zIndex: 999 } },
            react_1.default.createElement("button", { id: "settingsButton", onClick: handleSettingsClick },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "settings"))),
        react_1.default.createElement("div", { className: "logo" },
            react_1.default.createElement("img", { className: "logoImg", src: "./media/icon.png" }))));
}
