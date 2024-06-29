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
exports.default = Ball;
const react_1 = __importStar(require("react"));
function Ball() {
    const [resetTrigger, setResetTrigger] = (0, react_1.useState)(0);
    const [buttonPosition, setButtonPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    const [hoopPosition, setHoopPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    (0, react_1.useEffect)(() => {
        const canvasBall = document.querySelector("#sceneBall");
        const ctx = canvasBall.getContext("2d", { willReadFrequently: true });
        const mouse = { x: 0, y: 0 };
        const radius = 25;
        let isDragging = false;
        let isReleased = false;
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let centerX = (ww / 2);
        let centerY = (wh / 5) * 3;
        let ballX = centerX;
        let ballY = centerY;
        let vx = 0;
        let vy = 0;
        const damping = 0.7;
        const stiffness = 0.4;
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';
        const gravity = 0.3;
        const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');
        class Hoop {
            constructor(centerX, centerY, width, height, wall, color) {
                this.centerX = centerX;
                this.centerY = centerY;
                this.width = width;
                this.height = height;
                this.wall = wall;
                this.color = color;
            }
            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.rect(this.centerX - this.width / 2, this.centerY + this.height, this.width, this.wall);
                ctx.fill();
                ctx.beginPath();
                ctx.rect(this.centerX - this.width / 2, this.centerY, this.wall, this.height + this.wall);
                ctx.fill();
                ctx.beginPath();
                ctx.rect(this.centerX + this.width / 2 - this.wall, this.centerY, this.wall, this.height + this.wall);
                ctx.fill();
            }
            calculateCollisions() {
                return [
                    {
                        left: this.centerX - this.width / 2,
                        top: this.centerY + this.height,
                        right: this.centerX + this.width / 2,
                        bottom: this.centerY + this.height + this.wall
                    },
                    {
                        left: this.centerX - this.width / 2,
                        top: this.centerY,
                        right: this.centerX - this.width / 2 + this.wall,
                        bottom: this.centerY + this.height + this.wall
                    },
                    {
                        left: this.centerX + this.width / 2 - this.wall,
                        top: this.centerY,
                        right: this.centerX + this.width / 2,
                        bottom: this.centerY + this.height + this.wall
                    }
                ];
            }
        }
        const hoop = new Hoop((canvasBall.width / 4) * 3, canvasBall.height / 3, 125, 80, 10, color);
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
        const onMouseUp = (e) => {
            if (isDragging) {
                isDragging = false;
                const dx = ballX - centerX;
                const dy = ballY - centerY;
                vx = -dx * 0.1;
                vy = -dy * 0.1;
                isReleased = true;
            }
            if (isReleased) {
                setButtonPosition({ x: e.clientX, y: e.clientY });
            }
        };
        const initscene = () => {
            ww = canvasBall.width = window.innerWidth;
            wh = canvasBall.height = window.innerHeight;
            isDragging = false;
            isReleased = false;
            centerX = ww / 2;
            centerY = (wh / 5) * 3;
            ballX = centerX;
            ballY = centerY;
            hoop.centerX = (ww / 4) * 3;
            hoop.centerY = wh / 3;
            setButtonPosition({ x: centerX, y: centerY + 75 });
            // setHoopPosition({ x: (canvasBall.width / 4) * 3, y: (canvasBall.height / 3) });                
            vx = 0;
            vy = 0;
            render();
        };
        const resizeScene = () => {
            ww = canvasBall.width = window.innerWidth;
            wh = canvasBall.height = window.innerHeight;
            centerX = ww / 2;
            centerY = (wh / 5) * 3;
            ballX = centerX;
            ballY = centerY;
            vx = 0;
            vy = 0;
            hoop.centerX = (ww / 4) * 3;
            hoop.centerY = wh / 3;
            // setHoopPosition({ x: (canvasBall.width / 4) * 3, y: (canvasBall.height / 3) });                
            setButtonPosition({ x: centerX, y: centerY + 75 });
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
                    // vy -= gravity;
                }
                ballX += vx;
                ballY += vy;
                //hoop calculations
                const hoopRects = hoop.calculateCollisions();
                for (const rect of hoopRects) {
                    if (ballX + radius > rect.left && ballX - radius < rect.right
                        &&
                            ballY + radius > rect.top && ballY - radius < rect.bottom) {
                        if (ballY - radius < rect.top && ballY + radius > rect.bottom) {
                            vy *= -damping;
                            ballY = ballY < rect.top ? rect.top - radius : rect.bottom + radius;
                        }
                        else if (ballX - radius < rect.left && ballX + radius > rect.right) {
                            vx *= -damping;
                            ballX = ballX < rect.left ? rect.left - radius : rect.right + radius;
                        }
                    }
                }
                if (ballY + radius > wh || ballY - radius < 0) {
                    vy *= -damping;
                    if (ballY + radius > wh)
                        ballY = wh - radius;
                    if (ballY - radius < 0)
                        ballY = radius;
                }
                if (ballX + radius > ww || ballX - radius < 0) {
                    vx *= -damping;
                    if (ballX + radius > ww)
                        ballX = ww - radius;
                    if (ballX - radius < 0)
                        ballX = radius;
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
                        }
                    }
                    if (ballX + radius > ww || ballX - radius < 0) {
                        vx *= -damping;
                        if (ballX + radius > ww)
                            ballX = canvasBall.width - radius;
                        if (ballX - radius < 0) {
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
            }
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
            ctx.fill();
            hoop.draw(ctx);
            animationFrameId = requestAnimationFrame(render);
        };
        const handleThemeToggle = () => { resetScene(); };
        window.addEventListener("resize", resizeScene);
        if (darkmodeToggleButton) {
            darkmodeToggleButton.addEventListener('click', handleThemeToggle);
        }
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchend", onTouchEnd);
        initscene();
        return () => {
            window.removeEventListener("resize", resizeScene);
            if (darkmodeToggleButton) {
                darkmodeToggleButton.removeEventListener('click', handleThemeToggle);
            }
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
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Ball"),
        react_1.default.createElement("button", { className: "resetButton", style: {
                // left: buttonPosition.x-35, 
                // top: buttonPosition.y+70, 
                left: buttonPosition.x - 35,
                top: buttonPosition.y - 25,
            }, onMouseDown: resetScene },
            react_1.default.createElement("span", { className: "material-symbols-outlined", style: { fontSize: '30px' } }, "refresh")),
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
