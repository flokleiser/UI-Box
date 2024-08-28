"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Buttons;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Buttons() {
    const [isPressed, setIsPressed] = (0, react_1.useState)(false);
    const [isPressedEffect, setIsPressedEffect] = (0, react_1.useState)(false);
    const [isToggled, setIsToggled] = (0, react_1.useState)([false, false, false]);
    const handlePressEffect = () => {
        setIsPressedEffect(true);
        setTimeout(() => {
            setIsPressed(false);
        }, 50);
    };
    const handlePress = () => {
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
        }, 500);
    };
    const handleToggle = (index) => {
        const updateToggle = isToggled.map((state, i) => i === index ? !state : state);
        setIsToggled(updateToggle);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "bodyCenter", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: " Buttons " }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "buttonContainer", children: [(0, jsx_runtime_1.jsxs)("div", { className: "buttonRow", children: [(0, jsx_runtime_1.jsx)("button", { className: "button1", id: "buttonTest", onMouseDown: handlePress, children: " " }), (0, jsx_runtime_1.jsx)("button", { className: "button1", id: "buttonTest", onMouseDown: handlePress, children: " " }), (0, jsx_runtime_1.jsx)("button", { className: "button1", children: " " })] }), (0, jsx_runtime_1.jsxs)("div", { className: "buttonRow", children: [(0, jsx_runtime_1.jsx)("button", { className: "button1", children: " " }), (0, jsx_runtime_1.jsx)("button", { className: "button1", children: " " }), (0, jsx_runtime_1.jsx)("button", { className: "button1", children: " " })] }), (0, jsx_runtime_1.jsxs)("div", { className: "buttonRow", children: [(0, jsx_runtime_1.jsx)("button", { className: "button1", children: " " }), (0, jsx_runtime_1.jsx)("button", { className: "button1", children: " " }), (0, jsx_runtime_1.jsx)("button", { className: "button1", children: " " })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "buttonColumn", children: [(0, jsx_runtime_1.jsx)("button", { className: `${isToggled[0] ? 'button2toggled' : 'button2'}`, id: "buttonToggle1", onMouseDown: () => handleToggle(0) }), (0, jsx_runtime_1.jsx)("button", { className: `${isToggled[1] ? 'button2toggled' : 'button2'}`, id: "buttonToggle2", onMouseDown: () => handleToggle(1) }), (0, jsx_runtime_1.jsx)("button", { className: `${isToggled[2] ? 'button2toggled' : 'button2'}`, id: "buttonToggle3", onMouseDown: () => handleToggle(2) })] })] })] }) }));
}
//# sourceMappingURL=Buttons.js.map