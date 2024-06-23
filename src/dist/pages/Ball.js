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
function Ball() {
    const [resetTrigger, setResetTrigger] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const canvasBall = document.querySelector("#sceneBall");
        const ctx = canvasBall.getContext("2d", { willReadFrequently: true });
        const mouse = { x: 0, y: 0 };
        const radius = 25;
        let isDragging = false;
        let isReleased = false;
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let hoopX = (canvasBall.width / 4) * 3;
        let hoopY = canvasBall.height / 3;
        let centerX = (ww / 4);
        let centerY = (wh / 5) * 3;
        let ballX = centerX;
        let ballY = centerY;
        let vx = 0;
        let vy = 0;
        const damping = 0.7;
        const stiffness = 0.4;
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';
        const gravity = 0.3;
        const onMouseMove = (e) => {
            if (isDragging) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                ballX = mouse.x;
                ballY = mouse.y;
            }
        };
        const onTouchMove = (e) => {
            if (e.touches.length > 0 && isDragging) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
                ballX = mouse.x;
                ballY = mouse.y;
            }
        };
        const onTouchEnd = () => {
            if (isDragging) {
                isDragging = false;
            }
        };
        const onMouseDown = (e) => {
            const dist = Math.hypot(e.clientX - ballX, e.clientY - ballY);
            if (dist < radius) {
                isDragging = true;
            }
        };
        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                const dx = ballX - centerX;
                const dy = ballY - centerY;
                vx = -dx * 0.1;
                vy = -dy * 0.1;
                isReleased = true;
                console.log('Released', isReleased);
            }
        };
        const initscene = () => {
            ww = canvasBall.width = window.innerWidth;
            wh = canvasBall.height = window.innerHeight;
            isDragging = false;
            isReleased = false;
            centerX = ww / 4;
            centerY = (wh / 5) * 3;
            ballX = centerX;
            ballY = centerY;
            hoopX = (ww / 4) * 3;
            hoopY = wh / 3;
            vx = 0;
            vy = 0;
            render();
        };
        const resizeScene = () => {
            ww = canvasBall.width = window.innerWidth;
            wh = canvasBall.height = window.innerHeight;
            centerX = ww / 4;
            centerY = (wh / 5) * 3;
            ballX = centerX;
            ballY = centerY;
            hoopX = (ww / 4) * 3;
            hoopY = wh / 3;
            vx = 0;
            vy = 0;
        };
        let animationFrameId;
        const render = () => {
            if (!isDragging) {
                if (!isReleased) {
                    const dx = centerX - ballX;
                    const dy = centerY - ballY;
                    const ax = dx * stiffness;
                    const ay = dy * stiffness + gravity;
                    vx += ax;
                    vy += ay;
                    vx *= damping;
                    vy *= damping;
                }
                else {
                    vy += gravity;
                }
                ballX += vx;
                ballY += vy;
                if (ballX + radius > hoopX && ballX - radius < hoopX &&
                    ballY + radius > hoopY && ballY - radius < hoopY) {
                    vx *= -damping;
                    vy *= -damping;
                }
                if (ballY + radius > wh || ballY - radius < 0) {
                    vy *= -damping;
                    if (ballY + radius > wh)
                        ballY = wh - radius;
                    if (ballY - radius < 0) {
                        ballY = radius;
                        console.log('y direction change');
                    }
                }
                if (ballX + radius > ww || ballX - radius < 0) {
                    vx *= -damping;
                    if (ballX + radius > ww)
                        ballX = canvasBall.width - radius;
                    if (ballX - radius < 0) {
                        console.log('x direction change');
                        ballX = radius;
                    }
                }
            }
            else {
                if (isDragging) {
                    if (ballY + radius > wh || ballY - radius < 0) {
                        vy *= -damping;
                        if (ballY + radius > wh)
                            ballY = wh - radius;
                        if (ballY - radius < 0) {
                            ballY = radius;
                            console.log('y direction change');
                        }
                    }
                    if (ballX + radius > ww || ballX - radius < 0) {
                        vx *= -damping;
                        if (ballX + radius > ww)
                            ballX = canvasBall.width - radius;
                        if (ballX - radius < 0) {
                            console.log('x direction change');
                            ballX = radius;
                        }
                    }
                }
                vx = 0;
                vy = 0;
            }
            ctx.clearRect(0, 0, canvasBall.width, canvasBall.height);
            if (!isReleased) {
                ctx.strokeStyle = color;
                ctx.lineWidth = 10;
                ctx.lineCap = "round";
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(ballX, ballY);
                ctx.stroke();
                // if (isDragging) {
                //     ctx.strokeStyle = color;
                //     ctx.lineWidth = 2;
                //     // ctx.setLineDash([3,5]);
                //     ctx.lineCap = "round";
                //     let mirroredX = 2 * centerX - ballX;
                //     let mirroredY = 2 * centerY - ballY;
                //     ctx.beginPath();
                //     ctx.moveTo(centerX, centerY);
                //     ctx.lineTo(mirroredX,mirroredY);
                //     ctx.stroke();
                // }
            }
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = color;
            ctx.beginPath;
            ctx.rect(hoopX, hoopY, radius * 2, radius / 2);
            ctx.fill();
            animationFrameId = requestAnimationFrame(render);
        };
        window.addEventListener("resize", resizeScene);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchend", onTouchEnd);
        initscene();
        return () => {
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
        // window.location.reload();
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Ball"),
        react_1.default.createElement("button", { onMouseDown: resetScene }, "Reset"),
        react_1.default.createElement("canvas", { style: {
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                zIndex: -10
            }, id: "sceneBall" })));
}
exports.default = Ball;
