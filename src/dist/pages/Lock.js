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
                setRotation((prevRotation) => {
                    let newRotation = prevRotation - 4;
                    if (newRotation < -360) {
                        newRotation += 360;
                    }
                    if (Math.abs(newRotation) < 5 && Math.abs(newRotation) > -5) {
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
    }, [isDragging, dragStartAngle, initialRotation]);
    const calculateAngle = (x, y) => {
        if (!lockRef.current)
            return 0;
        const rect = lockRef.current.getBoundingClientRect();
        const lockX = rect.left + rect.width / 2;
        const lockY = rect.top + rect.height / 2;
        return Math.atan2(y - lockY, x - lockX) * (180 / Math.PI);
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
                setTimeout(() => {
                    emptyCircles();
                }, 100);
                return prevCount - 1;
            }
            else {
                setIsUnfilling(false);
                return prevCount;
            }
        });
    };
    // const fillCircles = () => {
    //     if (!isUnfilling && filledCircleCount < 4) {
    //         setFilledCircleCount(filledCircleCount + 1);
    //     }
    // }
    // const emptyCircles = () => {
    //     if (filledCircleCount > 0) {
    //         setTimeout(() => {
    //             setFilledCircleCount(filledCircleCount - 1);
    //             if(filledCircleCount -1 === 0) {
    //                 setIsUnfilling(false);
    //             }else{
    //                 setTimeout(emptyCircles, 500)
    //             }
    //         },500)
    //     }
    // }
    // useEffect(() => {
    //     if (filledCircleCount === 4) {
    //         setIsUnfilling(true);
    //         setTimeout(emptyCircles,1000)
    //     }
    // },[filledCircleCount])
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
            // let newRotation = initialRotation + angleDiff;
            if (e.clientX < window.innerWidth / 2) {
                angleDiff = -angleDiff;
                setRotation(initialRotation - angleDiff);
            }
            else {
                setRotation(initialRotation + angleDiff);
            }
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            react_1.default.createElement("h1", null, "Lock"),
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row' } },
                react_1.default.createElement("div", { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)', } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" },
                        " ",
                        filledCircleCount >= 1 ? 'radio_button_checked' : 'radio_button_unchecked',
                        " ")),
                react_1.default.createElement("div", { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)', } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" },
                        " ",
                        filledCircleCount >= 2 ? 'radio_button_checked' : 'radio_button_unchecked',
                        " ")),
                react_1.default.createElement("div", { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)', } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" },
                        " ",
                        filledCircleCount >= 3 ? 'radio_button_checked' : 'radio_button_unchecked',
                        " ")),
                react_1.default.createElement("div", { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)', } },
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
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '50%', left: '15%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '15%', left: '50%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '50%', left: '85%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '85%', left: '50%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '32.5%', left: '80%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '67.5%', left: '20%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '32.5%', left: '20%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '19.5%', left: '32.5%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '80.5%', left: '32.5%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '19.5%', left: '67.5%' } })),
                react_1.default.createElement("div", { className: "smallerLockCircleInvert", style: { top: '75%', left: '75%', width: 55, height: 55, borderRadius: '50%',
                    }, onMouseOver: () => { isDragging ? fillCircles() : ' '; } }),
                react_1.default.createElement("div", { className: "lockText", style: { top: '50%', left: '85%', pointerEvents: 'none' } }, "1"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '85%', left: '50%', pointerEvents: 'none' } }, "0"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '80.5%', left: '32.5%', pointerEvents: 'none' } }, "9"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '67.5%', left: '20%', pointerEvents: 'none' } }, "8"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '50%', left: '15%', pointerEvents: 'none' } }, "7"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '32.5%', left: '20%', pointerEvents: 'none' } }, "6"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '19.5%', left: '32.5%', pointerEvents: 'none' } }, "5"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '15%', left: '50%', pointerEvents: 'none' } }, "4"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '19.5%', left: '67.5%', pointerEvents: 'none' } }, "3"),
                react_1.default.createElement("div", { className: "lockText", style: { top: '32.5%', left: '80%', pointerEvents: 'none' } }, "2")))));
}
