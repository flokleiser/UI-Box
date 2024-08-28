"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Switches;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
function Switches() {
    const newSecondSwitch = false;
    const [isSwitched, setSwitched] = (0, react_1.useState)(false);
    const [isSwitchedFill, setSwitchedFill] = (0, react_1.useState)(false);
    const [verticalPosition, setVerticalPosition] = (0, react_1.useState)('middle');
    const [horizontalPosition, setHorizontalPosition] = (0, react_1.useState)('right');
    const [isSwitchedHorizontal, setSwitchedHorizontal] = (0, react_1.useState)(false);
    const [constraints, setConstraints] = (0, react_1.useState)({ top: 0, bottom: 0 });
    const [constraints2, setConstraints2] = (0, react_1.useState)({ top: 0, bottom: 0 });
    const dragControls = (0, framer_motion_1.useDragControls)();
    const controls = (0, framer_motion_1.useAnimation)();
    const [snapTo, setSnapTo] = (0, react_1.useState)({ y: 0 });
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
    function handleDragEndTest(e, info) {
        const verticalSwitch2 = document.getElementById("verticalSwitch2");
        const rect2 = verticalSwitch2.getBoundingClientRect();
        setConstraints({ top: -rect2.height / 2, bottom: rect2.height / 2 });
        const dragY = info.point.y - rect2.top;
        let newPosition;
        let snapY;
        if (dragY < rect2.height / 5) {
            newPosition = 'top';
            snapY = -(rect2.height / 2);
        }
        else if (dragY < (rect2.height / 5) * 2) {
            newPosition = 'middleTop';
            snapY = -(rect2.height / 4);
        }
        else if (dragY < (rect2.height / 5) * 3) {
            newPosition = 'middle';
            snapY = 0;
        }
        else if (dragY < (rect2.height / 5) * 4) {
            newPosition = 'middleBottom';
            snapY = (rect2.height / 4);
        }
        else {
            newPosition = 'bottom';
            snapY = (rect2.height / 2);
        }
        setVerticalPosition(newPosition);
        setSnapTo({ y: snapY });
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "bodyCenter", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: " Switches " }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsx)("div", { className: 'centerContainer', children: (0, jsx_runtime_1.jsx)("div", { className: 'switcherDiv', style: { backgroundColor: isSwitched ? "#ddd" : "#333", transition: '0.3s' }, onMouseDown: handleSwitch, children: (0, jsx_runtime_1.jsx)("div", { className: 'switcherCircle', style: { left: isSwitched ? "0px" : "100px", transition: '0.2s', backgroundColor: isSwitched ? "#333" : "#ddd" } }) }) }), (0, jsx_runtime_1.jsx)("div", { className: 'centerContainer', id: "horizontalSwitch", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: 'switcherDiv', style: { width: 325, backgroundColor: isSwitchedHorizontal ? "#ddd" : "#333", transition: '0.3s', height: '50px' }, onMouseDown: handleSwitchHorizontal, children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: "switcherCircleHorizontal", style: {
                                                // left: horizontalPosition === 'left' ? "0px" : horizontalPosition === 'middle' ? "112.5px" : "225px", 
                                                border: isSwitchedHorizontal ? '3px solid #ddd' : '3px solid #333',
                                                left: isSwitchedHorizontal ? "0px" : "220px",
                                                transition: '0.2s', backgroundColor: isSwitchedHorizontal ? "#333" : "#ddd"
                                            } }) }) }), (0, jsx_runtime_1.jsx)("div", { className: 'centerContainer', children: (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: 'switcherDivFill', style: { width: 275, display: 'flex', backgroundColor: '#333', borderRadius: '25px',
                                            justifyContent: 'center',
                                        }, onMouseDown: handleSwitchFill, children: [(0, jsx_runtime_1.jsx)("div", { className: 'switcherDivHalf', style: {
                                                    backgroundColor: isSwitchedFill ? '#333' : '#ddd',
                                                    scale: isSwitchedFill ? '0.9' : '1',
                                                    rotate: '180deg',
                                                    transition: '0.1s',
                                                    width: '133px'
                                                } }), (0, jsx_runtime_1.jsx)("div", { className: 'switcherDivHalf', style: {
                                                    backgroundColor: isSwitchedFill ? '#ddd' : '#333',
                                                    scale: isSwitchedFill ? '1' : '0.9',
                                                    transition: '0.1s',
                                                    width: '133px'
                                                } })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'centerContainer', children: [(0, jsx_runtime_1.jsx)("div", { className: "switcherDivVertical", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { id: "verticalSwitch", className: 'switcherDivVerticalLine', children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: 'switcherCircleVerticalOutline', drag: "y", dragConstraints: constraints, dragElastic: 0.1, 
                                            // dragTransition={{ bounceStiffness: 600, bounceDamping: 10}}
                                            dragTransition: { bounceStiffness: 500, bounceDamping: 50 }, animate: controls, style: { top: "0px", transition: '0.05s' }, children: (0, jsx_runtime_1.jsx)("div", { className: 'switcherCircleVerticalFill' }) }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "switcherDivVertical", children: (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { id: "verticalSwitch2", className: 'switcherDivVerticalLineFilled', children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    height: '350px',
                                                    position: 'absolute',
                                                    justifyContent: 'space-evenly',
                                                    justifySelf: 'center'
                                                }, children: [(0, jsx_runtime_1.jsx)("div", { className: "dividerLine" }), (0, jsx_runtime_1.jsx)("div", { className: "dividerLine" }), (0, jsx_runtime_1.jsx)("div", { className: "dividerLine" })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { className: 'switcherCircleVerticalOutline', style: { top: "0px", cursor: "grab" }, drag: "y", dragConstraints: constraints, dragElastic: 0, onDragEnd: handleDragEndTest, dragControls: dragControls, 
                                                // dragSnapToOrigin
                                                animate: snapTo, whileTap: { cursor: "grabbing" }, children: (0, jsx_runtime_1.jsx)("div", { className: 'switcherCircleVerticalFillAlt' }) })] }) })] })] })] }) }));
}
//# sourceMappingURL=Switches.js.map