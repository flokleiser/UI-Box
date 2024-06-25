"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const react_1 = __importDefault(require("react"));
function Navbar() {
    return (react_1.default.createElement("nav", null,
        react_1.default.createElement("div", { className: "left-buttons" },
            react_1.default.createElement("button", { id: "homeButton" },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "home")),
            react_1.default.createElement("button", { id: "buttonspageButton" },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "apps")),
            react_1.default.createElement("button", { id: "spinnerpageButton" },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "network_node")),
            react_1.default.createElement("button", { id: "particlespageButton" },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "lens_blur")),
            react_1.default.createElement("button", { id: "switchespageButton" },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "toggle_on")),
            react_1.default.createElement("button", { id: "tetherpageButton" },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "tenancy")),
            react_1.default.createElement("button", { id: "ballpageButton" },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "airline_stops")),
            react_1.default.createElement("button", { id: "joystickpageButton" },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "joystick")),
            react_1.default.createElement("button", { id: "lockpageButton" },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "refresh"))),
        react_1.default.createElement("div", { className: "settingsButton" },
            react_1.default.createElement("button", { id: "settingsButton" },
                react_1.default.createElement("span", { className: "material-symbols-outlined" }, "settings")))));
}
