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
const framer_motion_1 = require("framer-motion");
function Ball() {
    const [resetTrigger, setResetTrigger] = (0, react_1.useState)(0);
    const navbar = document.querySelector('#navbarRoot');
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
        let clicks = 0;
        const damping = 0.7;
        const stiffness = 0.4;
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';
        const gravity = 0.3;
        const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');
        function IncreaseClicks() {
            clicks += 1;
            console.log(clicks);
        }
        class Hoop {
            constructor(centerX, centerY, width, height, color) {
                this.centerX = centerX;
                this.centerY = centerY;
                this.width = width;
                this.height = height;
                this.color = color;
            }
            draw(ctx) {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.rect(this.centerX, this.centerY, this.width, this.height);
                ctx.fill();
            }
        }
        // const hoop = new Hoop( ((canvasBall.width / 4) * 3), (canvasBall.height / 3), 100, 50, 5, color);
        const hoopLeft = new Hoop(((canvasBall.width / 4) * 3), canvasBall.height / 3, 10, 50, color);
        const hoopRight = new Hoop(((canvasBall.width / 4) * 3), canvasBall.height / 3, 10, 50, color);
        const hoopBottom = new Hoop(((canvasBall.width / 4) * 3), (canvasBall.height / 3) + 50, 100, 10, color);
        function checkCollision(ballX, ballY, radius, rect) {
            const distX = Math.abs(ballX - rect.centerX - rect.width / 2);
            const distY = Math.abs(ballY - rect.centerY - rect.height / 2);
            if (distX > (rect.width / 2 + radius)) {
                return false;
            }
            if (distY > (rect.height / 2 + radius)) {
                return false;
            }
            if (distX <= (rect.width / 2)) {
                return true;
            }
            if (distY <= (rect.height / 2)) {
                return true;
            }
            const dx = distX - rect.width / 2;
            const dy = distY - rect.height / 2;
            return (dx * dx + dy * dy <= (radius * radius));
        }
        const onMouseMove = (e) => {
            if (clicks > 1) {
                if (isDragging) {
                    mouse.x = e.clientX;
                    mouse.y = e.clientY;
                    ballX = mouse.x;
                    ballY = mouse.y;
                }
            }
        };
        const onTouchMove = (e) => {
            if (clicks > 1) {
                if (e.touches.length > 0 && isDragging) {
                    mouse.x = e.touches[0].clientX;
                    mouse.y = e.touches[0].clientY;
                    ballX = mouse.x;
                    ballY = mouse.y;
                }
            }
        };
        const onTouchEnd = () => {
            if (isDragging) {
                isDragging = false;
            }
        };
        const onMouseDown = (e) => {
            centerX = e.clientX;
            centerY = e.clientY;
            IncreaseClicks();
            if (clicks > 1) {
                if (e.clientY + radius > wh || e.clientY - radius < 0 + navbar.offsetHeight) {
                    ballX = ww / 2;
                    ballY = wh / 2;
                    console.log('test inside area');
                }
                else {
                    ballX = centerX;
                    ballY = centerY;
                    console.log('test outside area');
                }
            }
            vx = 0;
            vy = 0;
            isDragging = true;
            isReleased = false;
        };
        const onMouseUp = (e) => {
            if (clicks > 1) {
                if (isDragging) {
                    isDragging = false;
                    const dx = ballX - centerX;
                    const dy = ballY - centerY;
                    vx = -dx * 0.1;
                    vy = -dy * 0.1;
                    isReleased = true;
                }
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
            hoopLeft.centerX = ((ww / 4) * 3) + 45;
            hoopLeft.centerY = wh / 3;
            hoopRight.centerX = ((ww / 4) * 3) - 45;
            hoopRight.centerY = wh / 3;
            // hoopBottom.centerX = (ww / 4) * 3;
            hoopBottom.centerX = ((ww / 4) * 3) - 45;
            hoopBottom.centerY = (wh / 3) + 50;
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
            hoopLeft.centerX = ((ww / 4) * 3) + 45;
            hoopLeft.centerY = wh / 3;
            hoopRight.centerX = ((ww / 4) * 3) - 45;
            hoopRight.centerY = wh / 3;
            hoopBottom.centerX = ((ww / 4) * 3) - 45;
            hoopBottom.centerY = (wh / 3) + 50;
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
                if (checkCollision(ballX, ballY, radius, hoopLeft)) {
                    if (ballX < hoopLeft.centerX) {
                        ballX = hoopLeft.centerX - radius;
                        vx *= -damping;
                    }
                    else {
                        ballX = hoopLeft.centerX + hoopLeft.width + radius;
                        vx *= -damping;
                    }
                }
                if (checkCollision(ballX, ballY, radius, hoopRight)) {
                    if (ballX < hoopRight.centerX) {
                        ballX = hoopRight.centerX - radius;
                        vx *= -damping;
                    }
                    else {
                        ballX = hoopRight.centerX + hoopRight.width + radius;
                        vx *= -damping;
                    }
                }
                if (checkCollision(ballX, ballY, radius, hoopBottom)) {
                    if (ballY < hoopBottom.centerY) {
                        ballY = hoopBottom.centerY - radius;
                        vy *= -damping;
                    }
                    else {
                        ballY = hoopBottom.centerY + hoopBottom.height + radius;
                        // ballY = hoopBottom.centerY + radius;
                        vy *= -damping;
                    }
                }
                //canvascollision
                if (ballY + radius > wh || ballY - radius < 0 + navbar.offsetHeight) {
                    vy *= -damping;
                    if (ballY + radius > wh)
                        ballY = wh - radius;
                    if (ballY - radius < 0 + navbar.offsetHeight) {
                        ballY = navbar.offsetHeight + radius;
                    }
                }
                if (ballX + radius > ww || ballX - radius < 0) {
                    vx *= -damping;
                    if (ballX + radius > ww)
                        ballX = ww - radius;
                    if (ballX - radius < 0)
                        ballX = radius;
                }
            }
            /* collision while dragging */
            if (isDragging) {
                if (ballY + radius > wh || ballY - radius < 0) {
                    vy *= -damping;
                    if (ballY + radius > wh) {
                        ballY = wh - radius;
                    }
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
                vx = 0;
                vy = 0;
            }
            ctx.clearRect(0, 0, canvasBall.width, canvasBall.height);
            if (!isReleased) {
                if (centerY + radius > wh || centerY - radius < 0 + navbar.offsetHeight) {
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(ballX, ballY);
                }
                else {
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 10;
                    ctx.lineCap = "round";
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(ballX, ballY);
                    ctx.stroke();
                }
            }
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
            ctx.fill();
            hoopLeft.draw(ctx);
            hoopRight.draw(ctx);
            hoopBottom.draw(ctx);
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
    return (react_1.default.createElement("div", { className: "bodyCenter" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' } },
                react_1.default.createElement("h1", null, "Ball"),
                react_1.default.createElement(framer_motion_1.motion.button, { className: "navbarButton", style: { backgroundColor: 'rgba(0,0,0,0)' }, id: "randomizerButton", whileHover: { rotate: 180 } },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "swap_horiz"))),
            react_1.default.createElement("canvas", { style: {
                    width: '100vw',
                    height: '100vh',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    overflow: 'hidden',
                    zIndex: -10
                }, id: "sceneBall" }))));
}
