"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = Slider;
const jsx_runtime_1 = require("react/jsx-runtime");
function Slider({ value, children, set, min = 0, max = 100 }) {
    return (
    // <label>
    // <div style={{display: 'flex',alignItems: 'center'}}>
    (0, jsx_runtime_1.jsxs)("div", { className: "volumeSliderDiv", children: [(0, jsx_runtime_1.jsx)("input", { className: "volumeSlider", value: value, type: "range", min: min, max: max, onChange: (e) => set(parseFloat(e.target.value)) }), (0, jsx_runtime_1.jsx)("h2", { className: "volumeSlider", style: { width: '100px', marginLeft: '25px' }, children: children })] })
    // </label>
    );
}
//# sourceMappingURL=Slider.js.map