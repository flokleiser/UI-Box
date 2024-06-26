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
exports.default = Buttons;
const react_1 = __importStar(require("react"));
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
        // if (isPressed) {
        //   let pressedButton = document.getElementById("buttonTest1")
        //   pressedButton?.setAttribute("style", "background-color: red;")
        // }
    };
    const handleToggle = (index) => {
        const updateToggle = isToggled.map((state, i) => i === index ? !state : state);
        setIsToggled(updateToggle);
        console.log('toggled', isToggled);
        // if (isToggled) 
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, " Buttons "),
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } },
            react_1.default.createElement("div", { className: "buttonContainer" },
                react_1.default.createElement("div", { className: "buttonRow" },
                    react_1.default.createElement("button", { className: "button1", id: "buttonTest", onClick: handlePress }, " "),
                    react_1.default.createElement("button", { className: "button1", id: "buttonTest", onClick: handlePress }, " "),
                    react_1.default.createElement("button", { className: "button1" }, " ")),
                react_1.default.createElement("div", { className: "buttonRow" },
                    react_1.default.createElement("button", { className: "button1" }, " "),
                    react_1.default.createElement("button", { className: "button1" }, " "),
                    react_1.default.createElement("button", { className: "button1" }, " ")),
                react_1.default.createElement("div", { className: "buttonRow" },
                    react_1.default.createElement("button", { className: "button1" }, " "),
                    react_1.default.createElement("button", { className: "button1" }, " "),
                    react_1.default.createElement("button", { className: "button1" }, " "))),
            react_1.default.createElement("div", { className: "buttonColumn" },
                react_1.default.createElement("button", { className: `${isToggled[0] ? 'button2toggled' : 'button2'}`, id: "buttonToggle1", onMouseDown: () => handleToggle(0) }),
                react_1.default.createElement("button", { className: `${isToggled[1] ? 'button2toggled' : 'button2'}`, id: "buttonToggle2", onMouseDown: () => handleToggle(1) }),
                react_1.default.createElement("button", { className: `${isToggled[2] ? 'button2toggled' : 'button2'}`, id: "buttonToggle3", onMouseDown: () => handleToggle(2) })))));
}
