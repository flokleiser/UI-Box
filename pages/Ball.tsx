import React, { useEffect, useState } from 'react';

export default function Ball() {

    const [resetTrigger, setResetTrigger] = useState(0);

    useEffect(() => {
        const canvasBall = document.querySelector("#sceneBall") as HTMLCanvasElement;
        const ctx = canvasBall.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
        const mouse = { x: 0, y: 0 };
        const radius = 25;
        let isDragging = false;
        let isReleased = false; 

        let ww = window.innerWidth;
        let wh = window.innerHeight;

        let hoopX1= (canvasBall.width/ 4)*3
        let hoopY1= canvasBall.height/3
        let centerX = (ww / 2);
        let centerY = (wh / 5) * 3;

        let ballX = centerX;
        let ballY = centerY;
        let vx = 0; 
        let vy = 0; 

        const fps = 25

        const damping = 0.7; 
        const stiffness = 0.4; 
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';
        const gravity = 0.3; 

        const onMouseMove = (e:MouseEvent) => {
            if (isDragging) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                ballX = mouse.x;
                ballY = mouse.y;
            }
        };

        const onTouchMove = (e:TouchEvent) => {
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

        const onMouseDown = (e:MouseEvent) => {
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
                console.log('Released', isReleased)
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
            hoopX1 = (ww/ 4)*3
            hoopY1 = wh/3

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
            hoopX1 = (ww/ 4)*3
            hoopY1 = wh/3
            vx = 0;
            vy = 0;
        }

        let animationFrameId: number;

        const render = () => {
            if (!isDragging) {
                if (!isReleased) {
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


                if (
                    ballX + radius > hoopX1 && ballX - radius < hoopX1 &&
                    ballY + radius > hoopY1 && ballY - radius < hoopY1
                ) { 
                    vx *= -damping
                    vy *= -damping
                }

                if (ballY + radius > wh || ballY - radius < 0) {
                    vy *= -damping;
                    if (ballY + radius > wh ) ballY = wh - radius;
                    if (ballY - radius < 0) {
                        ballY = radius;
                        console.log('y direction change')
                    }
                }

                if (ballX + radius > ww|| ballX - radius < 0) {
                    vx *= -damping;
                    if (ballX + radius > ww) ballX = canvasBall.width - radius;
                    if (ballX - radius < 0) {
                        console.log('x direction change')
                        ballX = radius;
                    }
                }
            } else {
                if (isDragging) {
                    if (ballY + radius > wh || ballY - radius < 0) {
                        vy *= -damping;
                        if (ballY + radius > wh ) ballY = wh - radius;
                        if (ballY - radius < 0) {
                            ballY = radius;
                            console.log('y direction change')
                        }
                    }
    
                    if (ballX + radius > ww|| ballX - radius < 0) {
                        vx *= -damping;
                        if (ballX + radius > ww) ballX = canvasBall.width - radius;
                        if (ballX - radius < 0) {
                            console.log('x direction change')
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


            ctx.fillStyle = color
            ctx.beginPath
            ctx.rect(hoopX1,hoopY1, radius*2, radius/2)
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

    return (
        <div>
            <h1>Ball</h1>
            <button 
            onMouseDown={resetScene}
            >
                 Reset 
            </button>
            <canvas
                style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    overflow: 'hidden',
                    zIndex: -10
                }}
                id="sceneBall">
            </canvas>
        </div>
    );
}