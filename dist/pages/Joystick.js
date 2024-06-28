"use strict";
//https://github.com/bobboteck/JoyStick?tab=readme-ov-file
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
exports.default = Joystick;
const react_1 = __importStar(require("react"));
function Joystick() {
    const [resetTrigger, setResetTrigger] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const canvasKeyboard = document.querySelector("#canvasKeyboard");
        const ctx = canvasKeyboard.getContext("2d", { willReadFrequently: true });
        const mouse = { x: 0, y: 0 };
        // const radius = 100;
        const radius = 75;
        let isDragging = false;
        let maxDistance = 80;
        let isMovingKeys = false;
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let centerX = (ww / 2) - 135;
        let centerY = wh / 2;
        let centerX2 = (ww / 2) + 135;
        let centerY2 = wh / 2;
        let circleX = centerX;
        let circleY = centerY;
        let vx = 0;
        let vy = 0;
        let circleX2 = centerX2;
        let circleY2 = centerY2;
        let vx2 = 0;
        let vy2 = 0;
        const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');
        const damping = 0.8;
        const stiffness = 0.05;
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';
        const colorText = getComputedStyle(document.documentElement).getPropertyValue('--canvas-colorelement') || 'black';
        const keyState = {
            w: false,
            a: false,
            s: false,
            d: false,
        };
        const onMouseMove = (e) => {
            if (isDragging) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                const dx2 = mouse.x - centerX2;
                const dy2 = mouse.y - centerY2;
                const dist2 = Math.hypot(dx2, dy2);
                if (dist2 <= maxDistance) {
                    circleX2 = mouse.x;
                    circleY2 = mouse.y;
                }
                else {
                    const angle2 = Math.atan2(dy2, dx2);
                    circleX2 = centerX2 + maxDistance * Math.cos(angle2);
                    circleY2 = centerY2 + maxDistance * Math.sin(angle2);
                }
            }
        };
        const onTouchMove = (e) => {
            if (e.touches.length > 0 && isDragging) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
                const dx2 = mouse.x - centerX2;
                const dy2 = mouse.y - centerY2;
                const dist2 = Math.hypot(dx2, dy2);
                if (dist2 <= maxDistance) {
                    circleX2 = mouse.x;
                    circleY2 = mouse.y;
                }
                else {
                    const angle2 = Math.atan2(dy2, dx2);
                    circleX2 = centerX2 + maxDistance * Math.cos(angle2);
                    circleY2 = centerY2 + maxDistance * Math.sin(angle2);
                }
            }
        };
        const onTouchEnd = () => {
            if (isDragging) {
                isDragging = false;
                console.log('stop drag');
            }
        };
        const onMouseDown = (e) => {
            const dist2 = Math.hypot(e.clientX - circleX2, e.clientY - circleY2);
            if (dist2 < radius) {
                isDragging = true;
            }
        };
        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
            }
        };
        const handleKeyDown = (event) => {
            if (keyState[event.key] !== undefined) {
                keyState[event.key] = true;
                isMovingKeys = true;
            }
        };
        const handleKeyUp = (event) => {
            if (keyState[event.key] !== undefined) {
                keyState[event.key] = false;
                isMovingKeys = Object.values(keyState).some(state => state);
            }
        };
        const updatePosition = () => {
            if (keyState.w)
                circleY -= 10;
            if (keyState.a)
                circleX -= 10;
            if (keyState.s)
                circleY += 10;
            if (keyState.d)
                circleX += 10;
            const dx = circleX - centerX;
            const dy = circleY - centerY;
            const dist = Math.hypot(dx, dy);
            if (dist > maxDistance) {
                const angle = Math.atan2(dy, dx);
                circleX = centerX + maxDistance * Math.cos(angle);
                circleY = centerY + maxDistance * Math.sin(angle);
            }
        };
        const initscene = () => {
            ww = canvasKeyboard.width = window.innerWidth;
            wh = canvasKeyboard.height = window.innerHeight;
            // centerX = ww / 2;
            centerX = (ww / 2) - 135;
            centerY = wh / 2;
            circleX = centerX;
            circleY = centerY;
            vx = 0;
            vy = 0;
            centerX2 = (ww / 2) + 135;
            centerY2 = wh / 2;
            circleX2 = centerX2;
            circleY2 = centerY2;
            vx2 = 0;
            vy2 = 0;
            render();
        };
        const resizeScene = () => {
            ww = canvasKeyboard.width = window.innerWidth;
            wh = canvasKeyboard.height = window.innerHeight;
            // centerX = ww / 4;
            centerX = (ww / 2) - 135;
            centerY = wh / 2;
            circleX = centerX;
            circleY = centerY;
            vx = 0;
            vy = 0;
            centerX2 = (ww / 2) + 135;
            centerY2 = wh / 2;
            circleX2 = centerX2;
            circleY2 = centerY2;
            vx2 = 0;
            vy2 = 0;
        };
        let animationFrameId;
        const render = () => {
            // const distToCenter = Math.hypot(circleX - centerX, circleY - centerY) 
            if (!isMovingKeys && !isDragging) {
                const dx = centerX - circleX;
                const dy = centerY - circleY;
                const ax = dx * stiffness;
                const ay = dy * stiffness;
                vx += ax;
                vy += ay;
                vx *= damping;
                vy *= damping;
                circleX += vx;
                circleY += vy;
                const dx2 = centerX2 - circleX2;
                const dy2 = centerY2 - circleY2;
                const ax2 = dx2 * stiffness;
                const ay2 = dy2 * stiffness;
                vx2 += ax2;
                vy2 += ay2;
                vx2 *= damping;
                vy2 *= damping;
                circleX2 += vx2;
                circleY2 += vy2;
            }
            else {
                updatePosition();
                vx = 0;
                vy = 0;
                vx2 = 0;
                vy2 = 0;
            }
            ctx.clearRect(0, 0, canvasKeyboard.width, canvasKeyboard.height);
            //ball keyboard
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = '48px Material Icons';
            // ctx.fillStyle = '#333';
            // ctx.fillStyle = 'rgba(51,51,51,0.5)';
            ctx.fillStyle = colorText;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('keyboard', circleX, circleY);
            //big circle keyboard
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, maxDistance + (radius / 2), 0, Math.PI * 2);
            ctx.stroke(),
                //ball mouse 
                ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(circleX2, circleY2, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = '48px Material Icons';
            // ctx.fillStyle = '#333333';
            // ctx.fillStyle = 'rgba(51,51,51,0.5)';
            ctx.fillStyle = colorText;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('mouse', circleX2, circleY2);
            //big circle mouse 
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX2, centerY2, maxDistance + (radius / 2), 0, Math.PI * 2);
            ctx.stroke(),
                animationFrameId = requestAnimationFrame(render);
        };
        const handleThemeToggle = () => { resetScene(); };
        darkmodeToggleButton.addEventListener('click', handleThemeToggle);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener("resize", resizeScene);
        initscene();
        return () => {
            darkmodeToggleButton.removeEventListener('click', handleThemeToggle);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener('keydown', handleKeyDown);
            window.addEventListener('keydown', handleKeyDown);
            window.removeEventListener("resize", resizeScene);
            cancelAnimationFrame(animationFrameId);
        };
    }, [resetTrigger]);
    function resetScene() {
        setResetTrigger(prev => prev + 1);
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Joystick"),
        react_1.default.createElement("canvas", { style: {
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                zIndex: -10
            }, id: "canvasKeyboard" })));
}
