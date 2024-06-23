"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Switches;
const react_1 = __importStar(require("react"));
function Switches() {
    const [isSwitched, setSwitched] = (0, react_1.useState)(false);
    function handleSwitch() {
        setSwitched(!isSwitched);
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, " Switches "),
        react_1.default.createElement("div", { className: 'centerContainer' },
            react_1.default.createElement("div", { className: 'switcherDiv', style: { backgroundColor: isSwitched ? "rgba(255, 255, 255, 0.5)" : "#333", transition: '0.3s' }, onMouseDown: handleSwitch },
                react_1.default.createElement("div", { className: 'switcherCircle', style: { left: isSwitched ? "0px" : "100px", transition: '0.3s', backgroundColor: isSwitched ? "#333" : "rgba(255, 255, 255, 0.5)" } })))));
}
