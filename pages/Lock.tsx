//https://github.com/bobboteck/JoyStick?tab=readme-ov-file

import React, { useEffect, useState } from 'react';

export default function Lock() {


    useEffect(() => {
        const canvasLock= document.querySelector("#canvasLock") as HTMLCanvasElement;
        const ctx = canvasLock.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
        const mouse = { x: 0, y: 0 };
        const radius = 175
        let isDragging = false;
        let maxDistance = 80;
        let isMovingKeys = false;

        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let centerX = ww / 2;
        let centerY = wh / 2;


        let circleX = centerX;
        let circleY = centerY;
        let vx = 0; 
        let vy = 0; 

        const damping = 0.8; 
        const stiffness = 0.05; 
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';

        
       
        const initscene = () => {
            ww = canvasLock.width = window.innerWidth;
            wh = canvasLock.height = window.innerHeight;
            centerX = ww / 2;
            centerY = wh / 2;
            circleX = centerX;
            circleY = centerY;
            vx = 0;
            vy = 0;
            render();
        };

        const resizeScene = () => {
            ww = canvasLock.width = window.innerWidth;
            wh = canvasLock.height = window.innerHeight;
            centerX = ww / 2;
            centerY = wh / 2;
            circleX = centerX;
            circleY = centerY;
            vx = 0;
            vy = 0;
        }

        let animationFrameId: number;

        const render = () => {

            const distToCenter = Math.hypot(circleX - centerX, circleY - centerY) 

            if (!isDragging && !isMovingKeys) {
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
            }
            // if (distToCenter > maxDistance) {
            //     const angle = Math.atan2(circleY - centerY, circleX - centerX);
            //     circleX = centerX + maxDistance * Math.cos(angle);
            //     circleY = centerY + maxDistance * Math.sin(angle);
            // }
            else {
                vx = 0;
                vy = 0;
            }

            ctx.clearRect(0, 0, canvasLock.width, canvasLock.height);

            //ball
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
            ctx.fill();

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener("resize", resizeScene);
        // window.addEventListener("mousemove", onMouseMove);
        // window.addEventListener("touchmove", onTouchMove);
        // window.addEventListener("mousedown", onMouseDown);
        // window.addEventListener("mouseup", onMouseUp);
        // window.addEventListener("touchend", onTouchEnd);
        initscene();

        return () => {
            window.removeEventListener("resize", resizeScene);
            // window.removeEventListener("mousemove", onMouseMove);
            // window.removeEventListener("touchmove", onTouchMove);
            // window.removeEventListener("mousedown", onMouseDown);
            // window.removeEventListener("mouseup", onMouseUp);
            // window.removeEventListener("touchend", onTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);


    return (
        <div>
            <h1>Lock (WIP)</h1>
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
                id="canvasLock">
            </canvas>
        </div>
    );
}
