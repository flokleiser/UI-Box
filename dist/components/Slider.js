"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = Slider;
const react_1 = __importDefault(require("react"));
function Slider({ value, children, set, min = 0, max = 100 }) {
    return (
    // <label>
    // <div style={{display: 'flex',alignItems: 'center'}}>
    react_1.default.createElement("div", { className: "volumeSliderDiv" },
        react_1.default.createElement("input", { className: "volumeSlider", value: value, type: "range", min: min, max: max, onChange: (e) => set(parseFloat(e.target.value)) }),
        react_1.default.createElement("h2", { className: "volumeSlider", style: { width: '100px', marginLeft: '25px' } }, children))
    // </label>
    );
}
