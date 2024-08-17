"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = Slider;
const react_1 = __importDefault(require("react"));
function Slider({ value, set, min = 0, max = 100 }) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("input", { value: value, type: "range", min: min, max: max, onChange: (e) => set(parseFloat(e.target.value)) }),
        react_1.default.createElement("input", { type: "number", value: value, min: min, max: max, onChange: (e) => set(parseFloat(e.target.value) || 0) })));
}
