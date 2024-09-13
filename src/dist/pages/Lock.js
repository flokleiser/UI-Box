"use strict";
//Todo: shaking animation after 4th input
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
exports.default = Lock;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
function Lock() {
    const [activeNumber, setActiveNumber] = (0, react_1.useState)(null);
    const lockRef = (0, react_1.useRef)(null);
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [rotation, setRotation] = (0, react_1.useState)(0);
    const [dragStartAngle, setDragStartAngle] = (0, react_1.useState)(0);
    const [initialRotation, setInitialRotation] = (0, react_1.useState)(0);
    const [velocity, setVelocity] = (0, react_1.useState)(0);
    const friction = 0.1;
    let animationFrameId;
    let resetAnimationFrameId;
    const [filledCircleCount, setFilledCircleCount] = (0, react_1.useState)(0);
    const [isUnfilling, setIsUnfilling] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!isDragging && rotation !== 0) {
            const resetRotation = () => {
                //old
                setRotation((prevRotation) => {
                    let newRotation = prevRotation - 10;
                    if (newRotation < -360) {
                        newRotation += 360;
                    }
                    if (Math.abs(newRotation) < 11 && Math.abs(newRotation) > -11) {
                        return 0;
                    }
                    resetAnimationFrameId = requestAnimationFrame(resetRotation);
                    return newRotation;
                });
            };
            resetRotation();
        }
        else if (resetAnimationFrameId) {
            cancelAnimationFrame(resetAnimationFrameId);
        }
        return () => {
            if (resetAnimationFrameId) {
                cancelAnimationFrame(resetAnimationFrameId);
            }
        };
    }, [isDragging]);
    (0, react_1.useEffect)(() => {
        const updateRotation = () => {
            setVelocity((prevVelocity) => {
                const newVelocity = prevVelocity * friction;
                if (Math.abs(newVelocity) < 0.001) {
                    return 0;
                }
                setRotation((prevRotation) => prevRotation + newVelocity);
                return newVelocity;
            });
            animationFrameId = requestAnimationFrame(updateRotation);
        };
        updateRotation();
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStartAngle,
        //  initialRotation
    ]);
    const calculateAngle = (x, y) => {
        if (!lockRef.current)
            return 0;
        const rect = lockRef.current.getBoundingClientRect();
        const lockX = rect.left + rect.width / 2;
        const lockY = rect.top + rect.height / 2;
        // return Math.atan2(y - lockY, x - lockX) * (180 / Math.PI);
        return (Math.atan2(y - lockY, x - lockX) * (180 / Math.PI) + 360) % 360;
    };
    const fillCircles = () => {
        if (isUnfilling)
            return;
        setFilledCircleCount((prevCount) => {
            if (prevCount <= 4) {
                if (prevCount < 4) {
                    prevCount = prevCount + 1;
                }
                if (prevCount === 4) {
                    setIsUnfilling(true);
                    setTimeout(() => {
                        emptyCircles();
                    }, 500);
                }
            }
            else {
                return 0;
            }
            return prevCount;
        });
    };
    const emptyCircles = () => {
        setFilledCircleCount((prevCount) => {
            if (prevCount > 0) {
                // setIsShaking(true)
                setTimeout(() => {
                    emptyCircles();
                }, 100);
                return prevCount - 1;
            }
            else {
                setIsUnfilling(false);
                // setIsShaking(false)
                return prevCount;
            }
        });
    };
    const handleMouseDown = (e) => {
        setIsDragging(true);
        const angle = calculateAngle(e.clientX, e.clientY);
        setDragStartAngle(angle);
        setInitialRotation(rotation);
    };
    const handleMouseMove = (e) => {
        if (isDragging) {
            const currentAngle = calculateAngle(e.clientX, e.clientY);
            let angleDiff = currentAngle - dragStartAngle;
            let newRotation = initialRotation + angleDiff;
            if (newRotation < 0 && newRotation > -45) {
                newRotation = -45;
            }
            // console.log(newRotation)
            setRotation(newRotation);
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    return (react_1.default.createElement("div", { className: "bodyCenter", onMouseUp: () => setActiveNumber(null) },
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            react_1.default.createElement("h1", null, "Lock"),
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
                react_1.default.createElement(framer_motion_1.motion.div, { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)', } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" },
                        " ",
                        filledCircleCount >= 1 ? 'radio_button_checked' : 'radio_button_unchecked',
                        " ")),
                react_1.default.createElement(framer_motion_1.motion.div, { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)', } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" },
                        " ",
                        filledCircleCount >= 2 ? 'radio_button_checked' : 'radio_button_unchecked',
                        " ")),
                react_1.default.createElement(framer_motion_1.motion.div, { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)', } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" },
                        " ",
                        filledCircleCount >= 3 ? 'radio_button_checked' : 'radio_button_unchecked',
                        " ")),
                react_1.default.createElement(framer_motion_1.motion.div, { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)', } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" },
                        " ",
                        filledCircleCount === 4 ? 'radio_button_checked' : 'radio_button_unchecked',
                        " ")))),
        react_1.default.createElement("div", { style: { justifyContent: 'center', alignItems: 'center', display: 'flex' } },
            react_1.default.createElement("div", { className: 'lockDiv' },
                react_1.default.createElement(framer_motion_1.motion.div, { className: "lock", ref: lockRef, onMouseDown: handleMouseDown, style: { transform: `rotate(${rotation}deg)` } },
                    react_1.default.createElement("div", { className: "lockCenter1", style: { top: '50%', left: '50%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '74.75%', left: '74.75%', borderRadius: '0 0 230px 0', width: 200, height: 200, pointerEvents: 'none' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircleInvert", style: { top: '57%', left: '84.75%', width: 115, height: 57.5, borderRadius: '0px 0px 57.5px 57.5px' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircleInvert", style: { top: '84.75%', left: '57%', height: 115, width: 57.5, borderRadius: '0px 57.5px 57.5px 0px' } }),
                    react_1.default.createElement("div", { className: "lockCenter2", style: { top: '50%', left: '50%' } }),
                    react_1.default.createElement("div", { className: "lockCenter1", style: { width: 165, height: 165, top: '50%', left: '50%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '50%', left: '15%' }, id: "number7", onMouseDown: () => setActiveNumber(7) }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '15%', left: '50%' }, id: "number4", onMouseDown: () => setActiveNumber(4) }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '50%', left: '85%' }, id: "number1", onMouseDown: () => setActiveNumber(1) }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '85%', left: '50%' }, id: "number0", onMouseDown: () => setActiveNumber(0) }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '32.5%', left: '80%' }, id: "number2", onMouseDown: () => setActiveNumber(2) }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '67.5%', left: '20%' }, id: "number8", onMouseDown: () => setActiveNumber(8) }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '32.5%', left: '20%' }, id: "number6", onMouseDown: () => setActiveNumber(6) }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '19.5%', left: '32.5%' }, id: "number5", onMouseDown: () => setActiveNumber(5) }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '80.5%', left: '32.5%' }, id: "number9", onMouseDown: () => setActiveNumber(9) }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '19.5%', left: '67.5%' }, id: "number3", onMouseDown: () => setActiveNumber(3) })),
                react_1.default.createElement("div", { className: "smallerLockCircleInvert", style: { top: '75%', left: '75%', width: 55, height: 55, borderRadius: '50%', } }),
                react_1.default.createElement("div", { className: "smallerLockCircleInvert", style: { top: '75%', left: '75%', width: 100, height: 100, borderRadius: '50%', opacity: 0,
                    }, onMouseOver: () => { isDragging ? fillCircles() : ' '; } }),
                react_1.default.createElement("div", { className: "lockText", style: { top: '50%', left: '85%', pointerEvents: 'none', opacity: activeNumber === 1 ? 1 : 0.25 } }, "1"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '85%', left: '50%', pointerEvents: 'none', opacity: activeNumber === 0 ? 1 : 0.25 } }, "0"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '80.5%', left: '32.5%', pointerEvents: 'none', opacity: activeNumber === 9 ? 1 : 0.25 } }, "9"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '67.5%', left: '20%', pointerEvents: 'none', opacity: activeNumber === 8 ? 1 : 0.25 } }, "8"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '50%', left: '15%', pointerEvents: 'none', opacity: activeNumber === 7 ? 1 : 0.25 } }, "7"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '32.5%', left: '20%', pointerEvents: 'none', opacity: activeNumber === 6 ? 1 : 0.25 } }, "6"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '19.5%', left: '32.5%', pointerEvents: 'none', opacity: activeNumber === 5 ? 1 : 0.25 } }, "5"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '15%', left: '50%', pointerEvents: 'none', opacity: activeNumber === 4 ? 1 : 0.25 } }, "4"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '19.5%', left: '67.5%', pointerEvents: 'none', opacity: activeNumber === 3 ? 1 : 0.25 } }, "3"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '32.5%', left: '80%', pointerEvents: 'none', opacity: activeNumber === 2 ? 1 : 0.25 } }, "2")))));
}
