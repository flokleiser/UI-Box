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
exports.default = Lock;
//https://github.com/bobboteck/JoyStick?tab=readme-ov-file
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
function Lock() {
    const lockRef = (0, react_1.useRef)(null);
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [rotation, setRotation] = (0, react_1.useState)(0);
    const [dragStartAngle, setDragStartAngle] = (0, react_1.useState)(0);
    const [initialRotation, setInitialRotation] = (0, react_1.useState)(0);
    const [velocity, setVelocity] = (0, react_1.useState)(0);
    const friction = 0.5;
    const [lastTime, setLastTime] = (0, react_1.useState)(0);
    const maxSpeed = 15;
    //old mouse logic
    (0, react_1.useEffect)(() => {
        let animationFrameId;
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
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    const calculateAngle = (x, y) => {
        if (!lockRef.current)
            return 0;
        const rect = lockRef.current.getBoundingClientRect();
        const spinnerX = rect.left + rect.width / 2;
        const spinnerY = rect.top + rect.height / 2;
        return Math.atan2(y - spinnerY, x - spinnerX) * (180 / Math.PI);
    };
    const handleMouseDown = (e) => {
        setIsDragging(true);
        const angle = calculateAngle(e.clientX, e.clientY);
        setDragStartAngle(angle);
        setInitialRotation(rotation);
        setLastTime(Date.now());
    };
    const handleMouseMove = (e) => {
        if (isDragging) {
            const currentAngle = calculateAngle(e.clientX, e.clientY);
            let angleDiff = currentAngle - dragStartAngle;
            const currentTime = Date.now();
            const timeDiff = (currentTime - lastTime);
            if (e.clientX < window.innerWidth / 2) {
                angleDiff = -angleDiff;
                setRotation(initialRotation - angleDiff);
            }
            else {
                setRotation(initialRotation + angleDiff);
            }
            if (timeDiff > 0) {
                const newVelocity = Math.min(maxSpeed, Math.max(-maxSpeed, angleDiff / timeDiff));
                setVelocity((newVelocity) / 4);
            }
            setLastTime(currentTime);
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    (0, react_1.useEffect)(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStartAngle, initialRotation, lastTime]);
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Lock")),
        react_1.default.createElement("div", { style: { justifyContent: 'center', alignItems: 'center', display: 'flex' } },
            react_1.default.createElement("div", { className: 'lockDiv' },
                react_1.default.createElement(framer_motion_1.motion.div, { className: "lock", ref: lockRef, onMouseDown: handleMouseDown, style: { transform: `rotate(${rotation}deg)` } },
                    react_1.default.createElement("div", { className: "lockCenter1", style: { top: '50%', left: '50%' } }),
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '74.75%', left: '74.75%', borderRadius: '0 0 230px 0', width: 200, height: 200 } }),
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
                    react_1.default.createElement("div", { className: "smallerLockCircle", style: { top: '19.5%', left: '67.5%' } }))))));
}
