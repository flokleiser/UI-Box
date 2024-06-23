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
const react_1 = __importStar(require("react"));
// export default function Spinner() {
const Spinner = () => {
    const spinnerRef = (0, react_1.useRef)(null);
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [rotation, setRotation] = (0, react_1.useState)(0);
    const [dragStartAngle, setDragStartAngle] = (0, react_1.useState)(0);
    const [initialRotation, setInitialRotation] = (0, react_1.useState)(0);
    const [velocity, setVelocity] = (0, react_1.useState)(0);
    const friction = 0.99;
    const [lastTime, setLastTime] = (0, react_1.useState)(0);
    const maxSpeed = 15;
    // let direction : number = 0,
    let direction = 0;
    let prevSide = null;
    const handleWheel = (event) => {
        // const scrollAmount = event.deltaY;
        let scrollAmount = event.deltaY;
        const rotationIncrement = 20;
        const currentSide = event.clientX < window.innerWidth / 2 ? 'left' : 'right';
        if (prevSide !== null && prevSide !== currentSide) {
            setVelocity(velocity * friction);
            direction = 0;
        }
        if (prevSide === 'left') {
            direction = scrollAmount < 0 ? 1 : -1;
        }
        else {
            direction = scrollAmount < 0 ? -1 : 1;
        }
        const newVelocity = Math.min(maxSpeed, Math.max(-maxSpeed, velocity + direction * rotationIncrement));
        setVelocity(newVelocity);
        prevSide = currentSide;
    };
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
        if (!spinnerRef.current)
            return 0;
        const rect = spinnerRef.current.getBoundingClientRect();
        const spinnerX = rect.left + rect.width / 2;
        const spinnerY = rect.top + rect.height / 2;
        return Math.atan2(y - spinnerY, x - spinnerX) * (180 / Math.PI);
    };
    // const handleMouseDown = (e:MouseEvent) => {
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
                setVelocity(newVelocity);
            }
            setLastTime(currentTime);
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    (0, react_1.useEffect)(() => {
        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStartAngle, initialRotation, lastTime]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, " Spinner "),
        react_1.default.createElement("div", { className: "spinnerDiv" },
            react_1.default.createElement("div", { className: "spinner", ref: spinnerRef, onMouseDown: handleMouseDown, style: { transform: `rotate(${rotation}deg)` } },
                react_1.default.createElement("div", { className: "spinnerCircle", style: { top: '0%', left: '50%' } }),
                react_1.default.createElement("div", { className: "spinnerCircleCenter", style: { top: '50%', left: '50%' } }),
                react_1.default.createElement("div", { className: "spinnerCircle", style: { top: '75%', left: '6.5%' } }),
                react_1.default.createElement("div", { className: "spinnerCircle", style: { top: '75%', left: '93.5%' } }),
                react_1.default.createElement("div", { className: "line", style: { top: '0%', left: '49%', height: '50%' } }),
                react_1.default.createElement("div", { className: "line", style: { top: '36%', left: '29%', height: '50%', transform: 'rotate(60deg' } }),
                react_1.default.createElement("div", { className: "line", style: { top: '36%', left: '70%', height: '50%', transform: 'rotate(120deg' } })))));
};
exports.default = Spinner;
