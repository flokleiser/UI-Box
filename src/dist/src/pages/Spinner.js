"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Spinner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Spinner() {
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
    return ((0, jsx_runtime_1.jsx)("div", { className: "bodyCenter", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: " Spinner " }), (0, jsx_runtime_1.jsx)("div", { className: "spinnerDiv", children: (0, jsx_runtime_1.jsxs)("div", { className: "spinner", ref: spinnerRef, onMouseDown: handleMouseDown, style: { transform: `rotate(${rotation}deg)` }, children: [(0, jsx_runtime_1.jsx)("div", { className: "spinnerCircle", style: { top: '0%', left: '50%' } }), (0, jsx_runtime_1.jsx)("div", { className: "spinnerCircleCenter", style: { top: '50%', left: '50%' } }), (0, jsx_runtime_1.jsx)("div", { className: "spinnerCircle", style: { top: '75%', left: '6.5%' } }), (0, jsx_runtime_1.jsx)("div", { className: "spinnerCircle", style: { top: '75%', left: '93.5%' } }), (0, jsx_runtime_1.jsx)("div", { className: "line", style: { top: '0%', left: '49%', height: '50%' } }), (0, jsx_runtime_1.jsx)("div", { className: "line", style: { top: '36%', left: '29%', height: '50%', transform: 'rotate(60deg' } }), (0, jsx_runtime_1.jsx)("div", { className: "line", style: { top: '36%', left: '70%', height: '50%', transform: 'rotate(120deg' } })] }) })] }) }));
}
//# sourceMappingURL=Spinner.js.map