//https://playcode.io/slingshot

import React, { useEffect, useState } from 'react';

export default function Ball() {
// const Ball: React.FC = () => {

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


        let centerX = ww / 4;
        let centerY = (wh / 3) * 2;


        let ballX = centerX;
        let ballY = centerY;
        let vx = 0; 
        let vy = 0; 

        const damping = 0.7; 
        // const stiffness = 0.1; 
        const stiffness = 0.4; 
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';
        // const gravity = 0.5; 
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
                // const dx = centerX - ballX;
                // const dy = centerY - ballY;
                // vx = -dx * 0.1; 
                // vy = -dy * 0.1; 
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
                // const dx = centerX - ballX;
                // const dy = centerY - ballY;
                // vx = -dx * 0.1;
                // vy = -dy * 0.1; 
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
            centerX = ww / 4;
            centerY = (wh/3)*2;
            ballX = centerX;
            ballY = centerY;
            vx = 0;
            vy = 0;
            render();
        };

        const resizeScene = () => {
            ww = canvasBall.width = window.innerWidth;
            wh = canvasBall.height = window.innerHeight;
            centerX = ww / 4;
            centerY = (wh / 3) * 2;
            ballX = centerX;
            ballY = centerY;
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

            //ball
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
            ctx.fill();

            // requestAnimationFrame(render);
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
            // cancelAnimationFrame(render);
            cancelAnimationFrame(animationFrameId);
        };
    }, [resetTrigger]);
    // }, [initscene]);


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

