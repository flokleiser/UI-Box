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
const framer_motion_1 = require("framer-motion");
function Switches() {
    const switcherMotion = {
        active: {
            rotation: "0"
            // scale:1
        },
        inactive: {
            rotaton: 180,
            // scale:2,
            transition: { duration: 2 }
        }
    };
    const [isSwitched, setSwitched] = (0, react_1.useState)(false);
    const [isSwitchedMotion, setSwitchedMotion] = (0, react_1.useState)(false);
    const [isSwitchedVertical, setSwitchedVertical] = (0, react_1.useState)(false);
    const [isSwitchedVerticalTop, setSwitchedVerticalTop] = (0, react_1.useState)(false);
    const [isSwitchedVerticalMiddle, setSwitchedVerticalMiddle] = (0, react_1.useState)(false);
    const [isSwitchedVerticalBottom, setSwitchedVerticalBottom] = (0, react_1.useState)(false);
    function handleSwitch() {
        setSwitched(!isSwitched);
    }
    function handleSwitchMotion() {
        setSwitchedMotion(!isSwitchedMotion);
    }
    function handleSwitchVertical(e) {
        const verticalSwitch = document.getElementById("verticalSwitch");
        verticalSwitch.getBoundingClientRect();
        // console.log(verticalSwitch!.clientHeight)
        // const topThird = verticalSwitch!.clientHeight()/3
        if (e.clientY < verticalSwitch.clientHeight / 3) {
            console.log('top');
            // setSwitchedVerticalTop(!isSwitchedVerticalTop)
        }
        if (e.clientY > verticalSwitch.clientHeight / 3) {
            console.log('bottom');
        }
        if (e.clientY < verticalSwitch.clientHeight && e.clientY > (verticalSwitch.clientHeight / 3) * 2) {
            console.log('middle');
        }
        console.log(e.clientY);
        setSwitchedVertical(!isSwitchedVertical);
        // console.log('Switched', isSwitchedVertical);
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, " Switches "),
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } },
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                react_1.default.createElement("div", { className: 'centerContainer' },
                    react_1.default.createElement("div", { className: 'switcherDiv', style: { backgroundColor: isSwitched ? "rgba(255, 255, 255, 0.5)" : "#333", transition: '0.3s' }, onMouseDown: handleSwitch },
                        react_1.default.createElement("div", { className: 'switcherCircle', style: { left: isSwitched ? "0px" : "100px", transition: '0.3s', backgroundColor: isSwitched ? "#333" : "rgba(255, 255, 255, 0.5)" } }))),
                react_1.default.createElement("div", { className: 'centerContainer' },
                    react_1.default.createElement(framer_motion_1.motion.div, { className: 'switcherDiv', style: { width: 350 }, 
                        // style={{width:500}}
                        onMouseDown: handleSwitchMotion })),
                react_1.default.createElement("div", { className: 'centerContainer' },
                    react_1.default.createElement(framer_motion_1.motion.div, { className: 'switcherDiv', style: { width: 275 }, onMouseDown: handleSwitchMotion }))),
            react_1.default.createElement("div", { className: 'centerContainer' },
                react_1.default.createElement("div", { className: "switcherDivVertical" },
                    react_1.default.createElement(framer_motion_1.motion.div, { id: "verticalSwitch", className: 'switcherDivVerticalLine', onMouseDown: handleSwitchVertical },
                        react_1.default.createElement("div", { className: 'switcherCircleVerticalOutline', style: { top: isSwitchedVertical ? "-150px" : "0px", transition: '0.2s' } },
                            react_1.default.createElement("div", { className: 'switcherCircleVerticalFill' }))))))));
}
