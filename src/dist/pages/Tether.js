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
exports.default = Tether;
const react_1 = __importStar(require("react"));
function Tether() {
    const [resetTrigger, setResetTrigger] = (0, react_1.useState)(0);
    const [colorChange, setColorChange] = (0, react_1.useState)(false);
    // const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');
    (0, react_1.useEffect)(() => {
        const canvasTether = document.querySelector("#sceneTether");
        const ctx = canvasTether.getContext("2d", { willReadFrequently: true });
        const mouse = { x: 0, y: 0 };
        const radius = 50;
        const radius2 = 25;
        const radius3 = 35;
        let isDragging = false;
        let isDragging2 = false;
        let isDragging3 = false;
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let centerX = ww / 2;
        let centerY = (wh / 3) * 2;
        let centerX2 = ww / 4;
        let centerY2 = wh / 3;
        let centerX3 = (ww / 4) * 3;
        let centerY3 = wh / 2;
        let particleX1 = centerX;
        let particleY1 = centerY;
        let vx1 = 0;
        let vy1 = 0;
        let particleX2 = centerX2;
        let particleY2 = centerY2;
        let vx2 = 0;
        let vy2 = 0;
        let particleX3 = centerX3;
        let particleY3 = centerY3;
        let vx3 = 0;
        let vy3 = 0;
        const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');
        let animationFrameId;
        const damping = 0.8;
        const stiffness = 0.1;
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color');
        const canvasElementColor = getComputedStyle(document.documentElement).getPropertyValue('--canvas-colorelement') || 'black';
        //mouse movements
        const onMouseMove = (e) => {
            if (isDragging) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                particleX1 = mouse.x;
                particleY1 = mouse.y;
            }
            if (isDragging2) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                particleX2 = mouse.x;
                particleY2 = mouse.y;
            }
            if (isDragging3) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                particleX3 = mouse.x;
                particleY3 = mouse.y;
            }
        };
        const onTouchMove = (e) => {
            if (e.touches.length > 0 && isDragging) {
                particleX1 = mouse.x;
                particleY1 = mouse.y;
            }
            if (e.touches.length > 0 && isDragging2) {
                particleX2 = mouse.x;
                particleY2 = mouse.y;
            }
            if (e.touches.length > 0 && isDragging3) {
                particleX3 = mouse.x;
                particleY3 = mouse.y;
            }
        };
        const onTouchEnd = () => {
            if (isDragging) {
                isDragging = false;
            }
            if (isDragging2) {
                isDragging2 = false;
            }
            if (isDragging3) {
                isDragging3 = false;
            }
        };
        const onMouseDown = (e) => {
            const dist = Math.hypot(e.clientX - particleX1, e.clientY - particleY1);
            if (dist < radius) {
                isDragging = true;
            }
            const dist2 = Math.hypot(e.clientX - particleX2, e.clientY - particleY2);
            if (dist2 < radius2) {
                isDragging2 = true;
            }
            const dist3 = Math.hypot(e.clientX - particleX3, e.clientY - particleY3);
            if (dist3 < radius3) {
                isDragging3 = true;
            }
        };
        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
            }
            if (isDragging2) {
                isDragging2 = false;
            }
            if (isDragging3) {
                isDragging3 = false;
            }
        };
        //init and resize
        const initscene = () => {
            ww = canvasTether.width = window.innerWidth;
            wh = canvasTether.height = window.innerHeight;
            centerX = ww / 2;
            centerY = (wh / 3) * 2;
            particleX1 = centerX;
            particleY1 = centerY;
            vx1 = 0;
            vy1 = 0;
            centerX2 = ww / 4;
            centerY2 = wh / 3;
            particleX2 = centerX2;
            particleY2 = centerY2;
            vx2 = 0;
            vy2 = 0;
            centerX3 = (ww / 4) * 3;
            centerY3 = wh / 2;
            particleX3 = centerX3;
            particleY3 = centerY3;
            vx3 = 0;
            vy3 = 0;
            render();
        };
        const resizeScene = () => {
            ww = canvasTether.width = window.innerWidth;
            wh = canvasTether.height = window.innerHeight;
            centerX = ww / 2;
            centerY = (wh / 3) * 2;
            particleX1 = centerX;
            particleY1 = centerY;
            vx1 = 0;
            vy1 = 0;
            centerX2 = ww / 4;
            centerY2 = wh / 3;
            particleX2 = centerX2;
            particleY2 = centerY2;
            vx2 = 0;
            vy2 = 0;
            centerX3 = (ww / 4) * 3;
            centerY3 = wh / 2;
            particleX3 = centerX3;
            particleY3 = centerY3;
            vx3 = 0;
            vy3 = 0;
        };
        const render = () => {
            const distToCenter1 = Math.hypot(particleX1 - centerX, particleY1 - centerY);
            const distToCenter2 = Math.hypot(centerX2 - particleX2, centerY2 - particleY2);
            const distToCenter3 = Math.hypot(centerX3 - particleX3, centerY3 - particleY3);
            const maxDist = 350;
            const minOpacity = 0.1;
            let opacity1 = Math.max(minOpacity, 1 - distToCenter1 / maxDist);
            let opacity2 = Math.max(minOpacity, 1 - distToCenter2 / maxDist);
            let opacity3 = Math.max(minOpacity, 1 - distToCenter3 / maxDist);
            const rgbaColor1 = `rgba(255, 255, 255, ${opacity1})`;
            const rgbaColor2 = `rgba(255, 255, 255, ${opacity2})`;
            const rgbaColor3 = `rgba(255, 255, 255, ${opacity3})`;
            if (!isDragging) {
                const dx = centerX - particleX1;
                const dy = centerY - particleY1;
                const ax = dx * stiffness;
                const ay = dy * stiffness;
                vx1 += ax;
                vy1 += ay;
                vx1 *= damping;
                vy1 *= damping;
                particleX1 += vx1;
                particleY1 += vy1;
            }
            else {
                vx1 = 0;
                vy1 = 0;
            }
            if (!isDragging2) {
                const dx2 = centerX2 - particleX2;
                const dy2 = centerY2 - particleY2;
                const ax2 = dx2 * stiffness;
                const ay2 = dy2 * stiffness;
                vx2 += ax2;
                vy2 += ay2;
                vx2 *= damping;
                vy2 *= damping;
                particleX2 += vx2;
                particleY2 += vy2;
            }
            else {
                vx2 = 0;
                vy2 = 0;
            }
            if (!isDragging3) {
                const dx3 = centerX3 - particleX3;
                const dy3 = centerY3 - particleY3;
                const ax3 = dx3 * stiffness;
                const ay3 = dy3 * stiffness;
                vx3 += ax3;
                vy3 += ay3;
                vx3 *= damping;
                vy3 *= damping;
                particleX3 += vx3;
                particleY3 += vy3;
            }
            else {
                vx3 = 0;
                vy3 = 0;
            }
            ctx.clearRect(0, 0, canvasTether.width, canvasTether.height);
            //tether
            ctx.strokeStyle = color;
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(particleX1, particleY1);
            ctx.stroke();
            ctx.strokeStyle = color;
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(centerX2, centerY2);
            ctx.lineTo(particleX2, particleY2);
            ctx.stroke();
            ctx.strokeStyle = color;
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(centerX3, centerY3);
            ctx.lineTo(particleX3, particleY3);
            ctx.stroke();
            ctx.fillStyle = rgbaColor1;
            ctx.beginPath();
            ctx.arc(particleX1, particleY1, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = rgbaColor2;
            ctx.beginPath();
            ctx.arc(particleX2, particleY2, radius2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = rgbaColor3;
            ctx.beginPath();
            ctx.arc(particleX3, particleY3, radius3, 0, Math.PI * 2);
            ctx.fill();
            animationFrameId = requestAnimationFrame(render);
        };
        const handleThemeToggle = () => { resetScene(); };
        if (darkmodeToggleButton) {
            darkmodeToggleButton.addEventListener('click', handleThemeToggle);
        }
        window.addEventListener("resize", resizeScene);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchend", onTouchEnd);
        initscene();
        return () => {
            if (darkmodeToggleButton) {
                darkmodeToggleButton.removeEventListener('click', handleThemeToggle);
            }
            window.removeEventListener("resize", resizeScene);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchend", onTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, [resetTrigger]);
    function resetScene() {
        setResetTrigger(prev => prev + 1);
    }
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Tether"),
            react_1.default.createElement("canvas", { style: {
                    width: '100vw',
                    height: '100vh',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    overflow: 'hidden',
                    zIndex: -10
                    // zIndex:0
                    // zIndex: 100
                }, id: "sceneTether" }))));
}
