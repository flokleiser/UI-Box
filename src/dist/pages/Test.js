"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Test;
const react_1 = __importDefault(require("react"));
function Test() {
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            react_1.default.createElement("h1", null, "Test")),
        react_1.default.createElement("div", { className: "music-progress" },
            react_1.default.createElement("div", { className: "progress-bar" },
                react_1.default.createElement("span", { className: "progress-line" }),
                react_1.default.createElement("input", { type: 'range', min: '0', max: '100', value: '0', className: "progress", id: "progress" })),
            react_1.default.createElement("div", { className: "duration" },
                react_1.default.createElement("span", { className: "current-time" }, "00:00"),
                react_1.default.createElement("span", { className: "duration-time" }, "00:00")))));
}
