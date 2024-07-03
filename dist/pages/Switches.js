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
        },
        inactive: {
            rotaton: 180,
            transition: { duration: 2 }
        }
    };
    const newSecondSwitch = false;
    const [isSwitched, setSwitched] = (0, react_1.useState)(false);
    const [isSwitchedMotion, setSwitchedMotion] = (0, react_1.useState)(false);
    const [isSwitchedFill, setSwitchedFill] = (0, react_1.useState)(false);
    const [verticalPosition, setVerticalPosition] = (0, react_1.useState)('middle');
    const [horizontalPosition, setHorizontalPosition] = (0, react_1.useState)('right');
    const [isSwitchedHorizontal, setSwitchedHorizontal] = (0, react_1.useState)(false);
    const [constraints, setConstraints] = (0, react_1.useState)({ top: 0, bottom: 0 });
    const dragControls = (0, framer_motion_1.useDragControls)();
    const controls = (0, framer_motion_1.useAnimation)();
    (0, react_1.useEffect)(() => {
        const verticalSwitch = document.getElementById("verticalSwitch");
        const rect = verticalSwitch.getBoundingClientRect();
        setConstraints({ top: -rect.height / 2, bottom: rect.height / 2 });
    }, []);
    function handleSwitch() {
        setSwitched(!isSwitched);
    }
    function handleSwitchFill() {
        setSwitchedFill(!isSwitchedFill);
    }
    function handleSwitchMotion() {
        setSwitchedMotion(!isSwitchedMotion);
    }
    function handleSwitchHorizontal(e) {
        if (newSecondSwitch) {
            const horizontalSwitch = document.getElementById('horizontalSwitch');
            const rect = horizontalSwitch.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX < rect.width / 3) {
                setHorizontalPosition('left');
            }
            else if (clickX < (rect.width / 3) * 2) {
                setHorizontalPosition('middle');
            }
            else {
                setHorizontalPosition('right');
            }
        }
        else {
            setSwitchedHorizontal(!isSwitchedHorizontal);
        }
    }
    function startDrag(event) {
        dragControls.start(event, { snapToCursor: true });
    }
    function handleDragEnd(e, info) {
        const verticalSwitch = document.getElementById("verticalSwitch");
        const rect = verticalSwitch.getBoundingClientRect();
        const dragY = info.point.y - rect.top;
        if (dragY < rect.height / 3) {
            setVerticalPosition('top');
        }
        else if (dragY < (rect.height / 3) * 2) {
            setVerticalPosition('middle');
        }
        else {
            setVerticalPosition('bottom');
        }
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, " Switches "),
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } },
                react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                    react_1.default.createElement("div", { className: 'centerContainer' },
                        react_1.default.createElement("div", { className: 'switcherDiv', style: { backgroundColor: isSwitched ? "#ddd" : "#333", transition: '0.3s' }, onMouseDown: handleSwitch },
                            react_1.default.createElement("div", { className: 'switcherCircle', style: { left: isSwitched ? "0px" : "100px", transition: '0.3s', backgroundColor: isSwitched ? "#333" : "#ddd" } }))),
                    react_1.default.createElement("div", { className: 'centerContainer', id: "horizontalSwitch" },
                        react_1.default.createElement(framer_motion_1.motion.div, { className: 'switcherDiv', style: { width: 325, backgroundColor: isSwitchedHorizontal ? "#ddd" : "#333", transition: '0.3s', height: '50px' }, onMouseDown: handleSwitchHorizontal },
                            react_1.default.createElement(framer_motion_1.motion.div, { className: "switcherCircleHorizontal", style: {
                                    // left: horizontalPosition === 'left' ? "0px" : horizontalPosition === 'middle' ? "112.5px" : "225px", 
                                    border: isSwitchedHorizontal ? '3px solid #ddd' : '3px solid #333',
                                    left: isSwitchedHorizontal ? "0px" : "220px",
                                    transition: '0.2s', backgroundColor: isSwitchedHorizontal ? "#333" : "#ddd"
                                } }))),
                    react_1.default.createElement("div", { className: 'centerContainer' },
                        react_1.default.createElement(framer_motion_1.motion.div, { className: 'switcherDivFill', style: { width: 275, display: 'flex', backgroundColor: '#333', borderRadius: '25px',
                                justifyContent: 'center',
                            }, onMouseDown: handleSwitchFill },
                            react_1.default.createElement("div", { className: 'switcherDivHalf', style: {
                                    backgroundColor: isSwitchedFill ? '#333' : '#ddd',
                                    scale: isSwitchedFill ? '0.9' : '1',
                                    rotate: '180deg',
                                    transition: '0.1s',
                                    width: '133px'
                                } }),
                            react_1.default.createElement("div", { className: 'switcherDivHalf', style: {
                                    backgroundColor: isSwitchedFill ? '#ddd' : '#333',
                                    scale: isSwitchedFill ? '1' : '0.9',
                                    transition: '0.1s',
                                    width: '133px'
                                } })))),
                react_1.default.createElement("div", { className: 'centerContainer' },
                    react_1.default.createElement("div", { className: "switcherDivVertical" },
                        react_1.default.createElement(framer_motion_1.motion.div, { id: "verticalSwitch", className: 'switcherDivVerticalLine' },
                            react_1.default.createElement(framer_motion_1.motion.div, { className: 'switcherCircleVerticalOutline', drag: "y", dragConstraints: constraints, dragElastic: 0, onDragEnd: handleDragEnd, animate: controls, style: { top: "0px", transition: '0.05s' } },
                                react_1.default.createElement("div", { className: 'switcherCircleVerticalFill' })))),
                    react_1.default.createElement("div", { className: "switcherDivVertical" },
                        react_1.default.createElement(framer_motion_1.motion.div, { id: "verticalSwitch", className: 'switcherDivVerticalLineFilled' },
                            react_1.default.createElement(framer_motion_1.motion.div, { className: 'switcherCircleVerticalOutline', 
                                // drag="y"
                                // dragConstraints={{
                                //     top: -100, 
                                //     bottom: 100
                                // }}
                                // dragElastic={0.1}
                                // onDragEnd={handleDragEnd}
                                // animate={controls}
                                // dragControls={dragControls}
                                // style={{ top: "0px"}}
                                drag: "y", dragConstraints: constraints, dragElastic: 0, onDragEnd: handleDragEnd, animate: controls, style: { top: "0px", transition: '0.05s' } },
                                react_1.default.createElement("div", { className: 'switcherCircleVerticalFillAlt' })))))))));
}
